import React, { FC, useEffect, useRef, useState } from "react";
import { Modal, Typography, message } from "antd";
import { Formik, Field } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import InputField from "../controls/InputField";
import * as Yup from "yup";
import { createGroup, updateGroup } from "../../api/groupTrading";
import SwitchField from "../controls/SwitchField";
import { Col, Row } from "react-bootstrap";
import CheckBoxField from "../controls/CheckBox";

interface IEditPublicFormProps {
  title?: any;
  group?: any;
  visible?: boolean;
  setVisibility?: any;
  isEdit?: any;
  onClose?: any;
  onSubmit?: any;
  stockList?: any;
}
const { Title } = Typography;

const groupTradingModalSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a group name."),
  amount: Yup.number().positive().integer().required("Please enter amount."),
  bid_user_limit: Yup.number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    // .typeError('Rounds limit must be a number.')
    .integer("Rounds limit only allow digits.")
    .required("Please enter rounds limit."),
  winning_limit: Yup.number()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter winning limit."),
    winning_amount:  Yup.number().positive()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter winning amount."),
    system_commision:  Yup.number().positive()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter system commission."),
    minimum_player:  Yup.number().positive()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter minimum player."),
    maximum_player:  Yup.number().positive()
    .moreThan(-1, "Rounds limit can't be a negative value.")
    .required("Please enter maximum player."),
  // first_rank_amount: Yup.number()
  //   .moreThan(-1, "Rounds limit can't be a negative value.")
  //   .required("Please enter first rank amount."),
  // last_rank_amount: Yup.number()
  //   .moreThan(-1, "Rounds limit can't be a negative value.")
  //   .required("Please enter last rank amount.")
  //   .lessThan(
  //     Yup.ref("first_rank_amount"),
  //     "Last rank amount must be less than first rank amount."
  //   ),
});

const GroupTradingAddModal: FC<IEditPublicFormProps> = ({
  title,
  group,
  visible,
  setVisibility,
  isEdit,
  onClose,
  onSubmit,
  stockList,
}) => {
  const formikRef = useRef(null);
  const [check, setCheck] = useState(1);
  const [isGuaranteed, setIsGuaranteed] = useState(0);
  const [stockTypeId, setStockTypeId] = useState(1);
  const [randomeKey, setRandomKey] = useState("");
  
  const initialValues = {
    id: group?.id ? group.id : null,
    stock_type_id: group?.stock_type_id ? group.stock_type_id : null,
    name: group?.name ? group.name : "",
    amount: group?.amount ? group.amount : "",
    bid_user_limit: group?.bid_user_limit ? group.bid_user_limit : "",
    status: group?.status ? group.status : 1,
    winning_limit: group?.winning_limit ? group.winning_limit : "",
    winning_amount: group?.winning_amount ? group.winning_amount : "",
    system_commision: group?.system_commision ? group.system_commision : "",is_guaranteed_return : "",
    guaranteed_user: group?.guaranteed_user ? group.guaranteed_user : "",
    minimum_player: group?.minimum_player ? group.minimum_player : "",
    maximum_player: group?.maximum_player ? group.maximum_player : "",

    first_rank_amount: group?.first_rank_amount ? group.first_rank_amount : "",
    last_rank_amount: group?.last_rank_amount ? group.last_rank_amount : "",
  };
  // const [stockList, setStockList] = useState([]);

  useEffect(() => {
    if (group.status !== undefined) {
      setCheck(group.status);
    }
  }, [group?.status]);

  useEffect(() => {
    if (group.stock_type_id) {
      setStockTypeId(group.stock_type_id);
    }
  }, [group?.stock_type_id]);

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
      stock_type_id: stockTypeId,
    };

    let response;
    try {
      if (values.id) {
        response = await updateGroup(values);
      } else {
        response = await createGroup(values);
      }
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

  if (stockList.length === 0) {
    return null;
  }

  const afterCloseFun = () => {
    setCheck(1);
    setStockTypeId(1);
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
      visible={visible}
      onCancel={() => {
        setVisibility(false);
        onClose();
      }}
      afterClose={() => afterCloseFun()}
      footer={null}
      destroyOnClose
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={groupTradingModalSchema}
        onSubmit={(values, actions) => submit(values, actions.setFieldError)}
        onReset={(setFieldValue) => {
          setCheck(1)
          setRandomKey(Math.random().toString(36));
        }}
      >
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
                placeholder="Enter amount"
                size="default"
                component={InputField}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="bid_user_limit"
                label="Rounds limit"
                type="number"
                placeholder="Enter rounds limit"
                size="default"
                component={InputField}
              />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="winning_limit"
                label="Winning Limit (In percentage)"
                type="number"
                placeholder="Enter winning limit"
                size="default"
                component={InputField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="winning_amount"
                label="Winning Amount"
                type="number"
                placeholder="Enter winning amount"
                size="default"
                component={InputField}
              />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="system_commision"
                label="System Commission"
                type="number"
                placeholder="Enter system commission"
                size="default"
                component={InputField}
              />
            </Col>
            {/* <Col xs={12} md={6} lg={6}>
              <Field
                name="first_rank_amount"
                type="number"
                label="First rank amount (In percentage)"
                placeholder="Enter first rank amount"
                size="default"
                component={InputField}
              />
            </Col> */}
            {/* <Col xs={12} md={6} lg={6}>
              <Field
                name="last_rank_amount"
                type="number"
                label="Last rank amount (In percentage)"
                placeholder="Enter last rank amount"
                size="default"
                component={InputField}
              />
            </Col> */}
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="minimum_player"
                label="minimum player"
                type="number"
                placeholder="Enter minimum player"
                size="default"
                component={InputField}
              />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="maximum_player"
                label="maximum player"
                type="number"
                placeholder="Enter maximum player"
                size="default"
                component={InputField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <Field
                name="is_guaranteed_return"
                label="is guaranteed return"
                size="default"
                placeholder="is guaranteed return"
                defaultChecked={isGuaranteed}
                onChange={(values: any) =>
                  setIsGuaranteed(values === false ? 1 : 0)
                }
                className="mt-1 d-block"
                component={CheckBoxField}
              />
            </Col>
            {!isGuaranteed ? (
              <Col xs={12} md={6} lg={6}>
                <Field
                  name="guaranteed_user"
                  label="guaranteed user"
                  type="number"
                  placeholder="Enter guaranteed user"
                  size="default"
                  component={InputField}
                />
              </Col>
            ) : (
              ""
            )}
          </Row>

          <Row>
            {/* <Col xs={12} md={6} lg={6}>
                <Field
                  name="stock_type_id"
                  label="Stock type"
                  placeholder="Select Stock type"
                  size="default"
                  defaultValue={stockTypeId}
                  onChange={(id: any) => setStockTypeId(id)}
                  component={SelectField}
                  options={stockList}
                />
              </Col> */}
            <Col xs={12} md={6} lg={6}>
              <Field
                name="status"
                label="Status"
                size="default"
                defaultChecked={check}
                onChange={(values: any) => setCheck(values === true ? 1 : 0)}
                className="mt-1 d-block"
                component={SwitchField}
                randomeKey={randomeKey}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-md-end">
            <Col className="d-flex justify-content-md-end">
              <ResetButton className="me-2">Reset</ResetButton>
              <SubmitButton>{isEdit ? "Update" : "Create"}</SubmitButton>
            </Col>
          </Row>
        </Form>
      </Formik>
    </Modal>
  );
};
export default GroupTradingAddModal;
