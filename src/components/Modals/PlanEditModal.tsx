import { FC, useEffect, useRef, useState } from "react";
import { Modal, Typography, message } from "antd";
import { Formik, Field } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import InputField from "../controls/InputField";
import * as Yup from "yup";
import { createPlan, updatePlan } from "../../api/plan";
import SwitchField from "../controls/SwitchField";
import { Container, Row, Col } from "react-bootstrap";

interface IEditPublicFormProps {
  title?: any;
  plan?: any;
  visible?: boolean;
  setVisibility?: any;
  onSuccess?: any;
  isEdit?: any;
  editId?: any;
  onClose?: any;
  onSubmit?: any;
}
const { Title } = Typography;

const editModalSchema = Yup.object().shape({
  name: Yup.string().required("Plan Name is Required"),
  amount: Yup.number().positive().required("Amount is Required"),
  coins: Yup.number().positive().integer().required("Coins is required"),
  discount: Yup.number().positive().integer(),
});

const EditModalForm: FC<IEditPublicFormProps> = ({
  title,
  visible,
  setVisibility,
  isEdit,
  plan,
  onClose,
  onSubmit,
}) => {
  const formikRef = useRef(null);
  const [check, setCheck] = useState(1);
  const [randomeKey, setRandomKey] = useState("");

  const initialValues = {
    id: plan?.id ? plan.id : null,
    name: plan?.name ? plan.name : "",
    amount: plan?.amount ? plan.amount : "",
    coins: plan?.coins ? plan.coins : "",
    discount: plan?.discount ? plan.discount : "",
    description: plan?.description ? plan.description : "",
  };

  useEffect(() => {
    if (plan.status !== undefined) {
      setCheck(plan.status);
    }
  }, [plan?.status]);

  const submit = async (values: any, setFieldError: any) => {
    values = {
      ...values,
      status: check,
    };

    try {
      let response;
      if (values.id) {
        response = await updatePlan(values);
      } else {
        response = await createPlan(values);
      }
      if (response.data.success) {
        message.success(response.data.message);
        setVisibility(false);
        onSubmit();
      }
    } catch (err: any) {
      message.destroy();
      if (err.response.status === 422) {
        for (const key in err.response.data.errors) {
          setFieldError(key, err.response.data.errors[key][0]);
        }
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
      visible={visible}
      onCancel={() => {
        setVisibility(false);
        onClose();
        setCheck(1);
      }}
      footer={null}
      destroyOnClose
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={editModalSchema}
        onSubmit={(values, actions) => submit(values, actions.setFieldError)}
        onReset={(setFieldValue) => {
          setCheck(1)
          setRandomKey(Math.random().toString(36));
        }}
        render={({ setFieldValue, setFieldError, errors, touched }) => {
          return (
            <Form layout="vertical" colon={false}>
              <Container fluid>
                <Row>
                  <Col xs={12} md={6} lg={6}>
                    <Field
                      name="name"
                      label="Plan Name"
                      placeholder="Enter Plan Name"
                      size="default"
                      component={InputField}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={6}>
                    <Field
                      name="amount"
                      label="Amount"
                      placeholder="Enter Amount"
                      type="number"
                      size="default"
                      component={InputField}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={6}>
                    <Field
                      name="coins"
                      label="Coins"
                      placeholder="Enter Coins"
                      type="number"
                      size="default"
                      component={InputField}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={6}>
                    <Field
                      name="discount"
                      label="Discount"
                      placeholder="Enter Discount"
                      size="default"
                      type="number"
                      component={InputField}
                    />
                  </Col>
                  <Col xs={12} md={12} lg={12}>
                    <Field
                      name="description"
                      label="Description"
                      placeholder="Enter Description"
                      size="default"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-md-start align-items-md-center mt-3">
                  <Col xs={4} md={4} lg={4}>
                    <Field
                      name="status"
                      label="Status"
                      size="default"
                      className="mt-1 d-block"
                      defaultChecked={check}
                      onChange={(values: any) =>
                        setCheck(values === true ? 1 : 0)
                      }
                      component={SwitchField}
                      randomeKey={randomeKey}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-md-end">
                  <Col xs lg="4" className="d-flex justify-content-end mt-2">
                    <ResetButton className="me-2">Reset</ResetButton>
                    <SubmitButton>{isEdit ? "Update" : "Create"}</SubmitButton>
                  </Col>
                </Row>
              </Container>
            </Form>
          );
        }}
      ></Formik>
    </Modal>
  );
};

export default EditModalForm;
