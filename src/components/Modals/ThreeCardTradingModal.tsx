import React, { FC, useRef, useState } from "react";
import { Modal, Typography, message } from "antd";
import { Formik, Field } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import InputField from "../controls/InputField";
import * as Yup from "yup";
import SwitchField from "../controls/SwitchField";
import { Col, Row } from "react-bootstrap";
import { createThreeCardGroup } from "../../api/threeCardTrading";

interface IEditPublicFormProps {
  title?: any;
  threeCardGroup?: any;
  visible?: boolean;
  setVisibility?: any;
  isEdit?: any;
  onClose?: any;
  onSubmit?: any;
}
const { Title } = Typography;

const threeCardTradingModalSchema = Yup.object().shape({
  name: Yup.string().required("Please enter group name."),
  amount: Yup.number()
    .positive()
    .integer()
    .required("Please enter amount.")
    .test(
      "It is",
      "Amount must be multiple of three",
      (value: any) => value % 3 === 0
    ),
  system_commission: Yup.number()
    .required("Please enter system commission.")
    .test(
      "It is",
      "System Commission must be between 0 to 100",
      (value: any) => value >= 0 && value <= 100
    ),
  // round_limit: Yup.number()
  // .moreThan(-1, "Rounds limit can't be a negative value.")
  /// / .typeError('Rounds limit must be a number.')
  // .integer("Rounds limit only allow digits.")
  // .required("Please enter rounds limit."),
  // shuffle_time: Yup.string().required("Please select shuffle time."),
});

const ThreeCardTradingAddModal: FC<IEditPublicFormProps> = ({
  title,
  threeCardGroup,
  visible,
  setVisibility,
  isEdit,
  onClose,
  onSubmit,
}) => {
  const formikRef = useRef(null);
  const [check, setCheck] = useState(1);
  const [randomeKey, setRandomKey] = useState("");

  const initialValues = {
    id: threeCardGroup?.id ? threeCardGroup.id : null,
    name: threeCardGroup?.name ? threeCardGroup.name : "",
    amount: threeCardGroup?.amount ? threeCardGroup.amount : "",
    // round_limit: threeCardGroup?.round_limit
    // ? threeCardGroup.round_limit
    // : "",
    status: threeCardGroup?.status ? threeCardGroup.status : 1,
    system_commission: threeCardGroup?.system_commission
      ? threeCardGroup.system_commission
      : "",
    // shuffle_time: threeCardGroup?.shuffle_time
    //   ? threeCardGroup.shuffle_time
    //   : "",
  };

  // useEffect(() => {
  // if (group.status !== undefined) {
  // setCheck(group.status);
  // }
  // }, [group?.status]);

  // useEffect(() => {
  // if (group.stock_type_id) {
  // setStockTypeId(group.stock_type_id);
  // }
  // }, [group?.stock_type_id]);

  // useEffect(() => {
  // fetchStockList();
  // }, []);

  // const fetchStockList = async () => {
  // const response = await getStockList();
  // setStockList(response.data.result);
  // };
  const submit = async (values: any, setFieldError: any) => {
    values = {
      ...values,
      status: check,
      round_limit: 1,
    };
    let response;

    try {
      response = await createThreeCardGroup(values);
      if (response.data.success) {
        message.success(response.data.message);
        setVisibility(false);
        onSubmit();
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      }
      message.destroy();
    }
  };

  // if (stockList.length === 0) {
  // return null;
  // }
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
      visible={visible}
      onCancel={() => {
        setVisibility(false);
        setCheck(1);
        // onClose();
      }}
      footer={null}
      destroyOnClose
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={threeCardTradingModalSchema}
        onSubmit={(values, actions) => submit(values, actions.setFieldError)}
        onReset={(setFieldValue) => {
          setCheck(1);
          setRandomKey(Math.random().toString(36));
        }}
        render={({ setFieldValue, touched, errors, handleBlur }) => {
          return (
            <Form>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <Field
                    name="name"
                    label="Group Name"
                    placeholder="Enter Group Name"
                    size="default"
                    component={InputField}
                  />
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <Field
                    name="amount"
                    label="Amount"
                    type="number"
                    placeholder="Enter Amount"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>

              <Row>
                {/* <Col xs={12} md={6} lg={6}>
                  <Field
                    name="round_limit"
                    label="Rounds limit"
                    type="number"
                    placeholder="Enter rounds limit"
                    size="default"
                    component={InputField}
                  />
                </Col> */}
                {/* <Col xs={12} md={6} lg={6} className="mt-1">
                  <>
                    <label>Shuffle Time</label>
                    <TimePicker
                      name="shuffle_time"
                      onBlur={handleBlur}
                      className={`${
                        touched.shuffle_time && errors.shuffle_time && "Error"
                      } d-block`}
                      onChange={(time: any, timeString: any) => {
                        setFieldValue("shuffle_time", timeString);
                      }}
                    />
                    {errors.shuffle_time && touched.shuffle_time ? (
                      <p className="text-danger Error-Text">
                        {errors.shuffle_time}
                      </p>
                    ) : null}
                  </>
                </Col> */}
                <Col xs={12} md={6} lg={6}>
                  <Field
                    name="system_commission"
                    label="System Commission"
                    type="number"
                    placeholder="Enter System Commission"
                    size="default"
                    component={InputField}
                  />
                </Col>
                <Col xs={12} md={6} lg={6} className="mt-1">
                  <Field
                    name="status"
                    label="Status"
                    size="default"
                    defaultChecked={check}
                    onChange={(values: any) =>
                      setCheck(values === true ? 1 : 0)
                    }
                    className="mt-1 d-block"
                    component={SwitchField}
                    randomeKey={randomeKey}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-md-end">
                <Col className="d-flex justify-content-end mt-1">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <SubmitButton>{isEdit ? "Update" : "Create"}</SubmitButton>
                </Col>
              </Row>
            </Form>
          );
        }}
      />
    </Modal>
  );
};
export default ThreeCardTradingAddModal;
