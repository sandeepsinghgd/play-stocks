import { Modal, Typography, message, Button } from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton } from "formik-antd";
import { FC, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";
import InputField from "../controls/InputField";
import SelectField from "../controls/SelectField";
import { createStock, getInstrumentToken, updateStock } from "../../api/stocks";
import "../../styles/stockModal.scss";
import FileUploader from "../controls/FileUploader";

const { Title } = Typography;

interface IEditPublicFormProps {
  title?: any;
  stock?: any;
  visible?: boolean;
  setVisibility?: any;
  onSuccess?: any;
  isEdit?: any;
  editId?: any;
  onClose?: any;
  onSubmit?: any;
  stockTypesList?: any;
  isActionPerform?: any;
  setCreateModalVisibility?:any;
}

const SUPPORTED_FORMATS = ["image/svg+xml", "image/png"];

const StocksModalSchema = Yup.object().shape({
  type_id: Yup.array()
    .min(1, "Stock index must have minimum one item")
    .required("Stock Index field  is Required"),
  symbol: Yup.string().required("Plase enter symbols"),
  logo: Yup.mixed()
    .required("Logo field is required")
    .test("FILE_FORMAT", "Image Type must be .png/.svg .", (value) => {
      const type =value && value?.type ? SUPPORTED_FORMATS.includes(value?.type) : (value?.includes(".png") || value?.includes(".svg"));
      return  type;
      // return (value && SUPPORTED_FORMATS.includes(value?.type)) || value.includes(".png") || value.includes(".svg");
    }),
  company_name: Yup.string().required("Company name is required").nullable(),
});

const StocksModal: FC<IEditPublicFormProps> = ({
  title,
  stock,
  visible,
  setVisibility,
  onSubmit,
  onSuccess,
  onClose,
  isEdit,
  editId,
  stockTypesList,
  isActionPerform,
  setCreateModalVisibility
}) => {
  const formikRef = useRef(null);
  const [stocks, setStocks] = useState<any>([]);
  // const [Refresh, setRefresh] = useState(1);
  const [file, setFile] = useState<any>();
  const [symbol, setSymbol] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [StockSymbol, setStockSymbol] = useState("");
  const [previousStockSymbol, setPreviousStockSymbol] = useState("");
  const [instrumentToken, setInstrumentToken] = useState<any>("");
  const [optionVal, setOptionVal] = useState<any>([]); //eslint-disable-line
  const [randomeKey, setRandomKey] = useState("");
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [initialValues, setInitialValues] = useState<any>({
    id: null,
    type_id: [],
    symbol: "",
    logo: null,
    instrument_token: "",
    company_name: "",
  });
  
  useEffect(() => {
    var newStockIndex: any = [];
    stock?.types?.forEach((type: any, index: number) => {
      newStockIndex.push(type?.id);
    });
    setOptionVal(newStockIndex);
  }, [stock?.types]);

  useEffect(() => {
    if (stock?.logo) {
      setFile(stock.logo);
      const logoUrl = stock?.logo;
      const segements = logoUrl?.split("/");
      const imgName = segements?.slice(-1);
      
      setFileList([
        {
          uid: "1",
          name: imgName,
          status: "done",
          url: "https://stock-api.playstocks.in/" + stock?.logo,
          thumbUrl: "https://stock-api.playstocks.in/" + stock?.logo,
        }
      ])
    }
  }, [stock.logo]);

  useEffect(() => {
    if (stock.type_id !== undefined) {
      setStocks(stock.type_id);
    }
  }, [stock?.type_id]);
  
  useEffect(() => {
    if(previousStockSymbol && symbol){
      if (previousStockSymbol !== symbol) {
        setInstrumentToken(null);
      }
    }
  }, [previousStockSymbol, symbol]);

  // useEffect(() => {
  //   setInitialValues({
  //     // ...initialValues,
  //     instrument_token: instrumentToken,
  //     company_name: companyName,
  //     symbol: StockSymbol,
  //   });
  // },[instrumentToken]);
  
  useEffect(() => {
    setSymbol(stock?.symbol);
    setPreviousStockSymbol(stock?.symbol);
    setInitialValues({
      id: stock?.id ? stock?.id : null,
      type_id: stock?.types ? stock?.types : [],
      symbol: stock?.symbol ? stock?.symbol : "",
      logo: stock?.logo ? stock?.logo : null,
      instrument_token: stock?.instrument_token,
      company_name: stock?.company_name ? stock?.company_name : "",
    });
  },[stock]);

  const InstrumentTokenApi = async (setFieldValue: any, setFieldError:any) => {
    try {
      const params = {
        symbol: symbol,
        exchange: "NSE",
      };
      setPreviousStockSymbol(symbol);
      const resp = await getInstrumentToken(params);
      setInstrumentToken(resp.data.result.instrument_token);
      setFieldValue("instrument_token", resp.data.result.instrument_token)
    }catch(error:any){

      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      } else if (error.response.status === 400) {
        message.destroy();
        message.error(error.response.data.message);
        setCreateModalVisibility(false);
      } else if(error.response.status === 404){
        setFieldError("symbol", error.response.data.message);
        // message.error(error.response.data.message);
      }
    }
  };

  const submit = async (values: any, setFieldError: any) => {
    const form = new FormData();
    try {
      let response;
      values = {
        ...values,
      };
      if (values.id) {
        form.append("id", values.id);
        form.append("symbol", values.symbol);
        form.append("logo", file);
        form.append("instrument_token", values.instrument_token);
        form.append("company_name", values.company_name);
        values.type_id.forEach((val: any) => form.append("type_id[]", val?.id ? val?.id : val));
        response = await updateStock(values?.id, form);
        onSuccess();
        setVisibility(false);
      } else {
        values.type_id.forEach((val: any) => form.append("type_id[]", val?.id ? val?.id : val));
        form.append("symbol", values.symbol);
        form.append("logo", file);
        form.append("instrument_token", values.instrument_token);
        form.append("company_name", values.company_name);
        response = await createStock(form);
        onSuccess();
        setVisibility(false);
      }
      if (response.data.success) {
        isActionPerform(true);
        message.success(response.data.message);
        setVisibility(false);
        onSubmit();
      }
    }catch (error: any) {
      // isActionPerform(true);
      // setVisibility(false);
      // setCreateModalVisibility(false);
      // // message.destroy();
      // if (error.response.status === 422) {
      //   for (const key in error.response.data.errors) {
      //     message.error("Error");
      //   }
      // }
      // message.destroy();
      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      } else if (error.response.status === 400) {
        message.destroy();
        message.error(error.response.data.message);
        setCreateModalVisibility(false);
      }
    }
  };

  return (
    <Modal
      title={
        <Title
          level={4}
          className="mb-0"
          style={{ display: "flex", alignItems: "center" }}
        >
          {title}
        </Title>
      }
      // className="w-25"
      visible={visible}
      afterClose={() => setInstrumentToken("")}
      onCancel={() => {
        onClose(setStocks([]), setInstrumentToken(""));
        setInstrumentToken("");
        setVisibility(false);
        setStocks([]);
        setSymbol("");
        setPreviousStockSymbol("")
      }}
      footer={null}
      destroyOnClose
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={StocksModalSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          submit(values, actions.setFieldError);
        }}
        onReset={(setFieldValue) => {
          !isEdit && setStocks([]);
          setFile(null);
          setSymbol("");
          setRandomKey(Math.random().toString(36));
        }}
      >
        {({
          values,
          setFieldTouched,
          setFieldValue,
          setFieldError,
        }) => {
          return (
            <Form layout="vertical" colon={false}>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <Field
                    name="company_name"
                    label="Company Name"
                    placeholder="Enter Company Name"
                    size="default"
                    component={InputField}
                  />
                </Col>
                <Col xs={12} md={7} lg={7}>
                  <Field
                    randomeKey={randomeKey}
                    name="symbol"
                    label="Stock Symbol"
                    placeholder="Enter Stock Symbol"
                    size="default"
                    component={InputField}
                    isOnChange={true}
                    defaultValue={values.symbol}
                    onChange={(e: any) => {
                      setFieldValue("instrument_token", "")
                      setFieldValue("symbol", e.target.value)
                      setSymbol(e.target.value)
                    }}
                  />
                </Col>
                <Col
                  xs={12}
                  md={5}
                  lg={5}
                  className="mt-2 md:!mt-5"
                  style={{ width: "40%" }}
                >
                  <Button
                    type="primary"
                    className="mt-1 w-100"
                    onClick={() => InstrumentTokenApi(setFieldValue, setFieldError)}
                  >
                    Verify Stock
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={7} lg={7}>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Field
                        name="instrument_token"
                        label="Instrument Token"
                        size="default"
                        defaultValue={instrumentToken || ""}
                        component={InputField}
                        readOnly
                      />
                    </Col>
                    <Col xs={12} md={12} lg={12} className="mt-1">
                      <Field
                        mode={"multiple"}
                        name="type_id"
                        label="Stock Index"
                        placeholder="Select Stock Index"
                        size="default"
                        component={SelectField}
                        value={stocks}
                        onChange={(val: any, option: any) => {
                          setStocks(val);
                          setFieldValue("type_id", val);
                        }}
                        onBlur={() => {
                          setFieldTouched("type_id");
                        }}
                        options={stockTypesList}
                        defaultValue={optionVal}
                        randomeKey={randomeKey}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={5} lg={5}>
                  <Field
                    name="logo"
                    label="Logo"
                    size="default"
                    listType="text"
                    value={file}
                    defaultFileList={isEdit == true && file != null && [...fileList]}
                    component={FileUploader}
                    onBlur={() => {
                      setFieldTouched("logo", file);
                      setFieldError("logo", file);
                    }}
                    onRemove={() => {
                      setFile(null);
                      setFieldValue("logo", "");
                    }}
                    maxCount={1}
                    previewVisible={true}
                    beforeUpload={(file: any) => {
                      setFile(file);
                      setFieldValue("logo", file);
                      return false;
                    }}
                    onChange={(file: any) => {
                      setFile(file);
                      setFieldValue("logo", file);
                      return false;
                    }}
                    btnName="Upload Logo"
                    btnDisplay="d-block"
                    randomeKey={randomeKey}
                  />
                </Col>
              </Row>
              <Row className="justify-content-md-end">
                <Col xs lg="4" className="d-flex justify-content-md-end mt-3">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <button type="submit" className="p-1 submitBtn">
                    {isEdit ? "Update" : "Create"}
                  </button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default StocksModal;
