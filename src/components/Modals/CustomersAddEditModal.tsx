import React, { FC, useEffect, useRef, useState } from "react";
import { Modal, Typography, message } from "antd";
import { Formik, Field } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import InputField from "../controls/InputField";
import * as yup from "yup";
import { Col, Row } from "react-bootstrap";
import SwitchField from "../controls/SwitchField";
import { createCustomer, updateCustomer } from "../../api/customer";
interface ICustomersAddEditModalProps {
  title?: any;
  user?: any;
  visible?: boolean;
  setVisibility?: any;
  isEdit?: any;
  onClose?: any;
  onSubmit?: any;
}
const { Title } = Typography;

const CustomersAddEditModal: FC<ICustomersAddEditModalProps> = ({
  title,
  user,
  visible,
  setVisibility,
  isEdit,
  onClose,
  onSubmit,
}) => {
  const formikRef = useRef(null);
  const entity = "Customer";
  const [check, setCheck] = useState(1);
  const [randomeKey, setRandomKey] = useState("");
  const phoneRegExp = /^[1-9][0-9]{9}$/;

  const initialValues = {
    id: user?.id ? user.id : null,
    first_name: user?.first_name ? user.first_name : "",
    last_name: user?.last_name ? user.last_name : "",
    email: user?.email ? user.email : "",
    phone: user?.phone ? user.phone : "",
    status: user?.status ? user.status : 1,
  };
  const editModalSchema = yup.object().shape({
    first_name: yup
      .string()
      .required("Please enter first name.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed as first name."),
    last_name: yup
      .string()
      .required("Please enter last name.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed as first name."),

    email: yup.string().email().required("Please enter an email."),
    phone: yup
      .string()
      .required("Phone Number is Required")
      .matches(phoneRegExp, "Phone number is not valid")
      .test(
        "It is",
        "Phone number must contain 10 digits only.",
        (value: any) => value?.length === 10
      ),
  });

  useEffect(() => {
    if (user.status !== undefined) {
      setCheck(user.status);
    }
  }, [user?.status]);

  const submit = async (values: any, setFieldError: any) => {
    try {
      let response;
      values = {
        ...values,
        status: check,
      };

      if (values.id) {
        message.loading(`Updating ${entity}...`, 0);
        response = await updateCustomer(values);
      } else {
        response = await createCustomer(values);
      }
      if (response.data.success) {
        message.destroy();
        message.success(response.data.message);
        setVisibility(false);
        onSubmit();
      }
    } catch (error: any) {
      message.destroy();
      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      }
      message.destroy();
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
      onCancel={(e) => {
        setVisibility(false);
        onClose();
      }}
      footer={null}
      destroyOnClose
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={editModalSchema}
        onSubmit={(values, actions) => {
          submit(values, actions.setFieldError);
        }}
        onReset={() => {
          setCheck(1)
          setRandomKey(Math.random().toString(36));
        }}
        render={({ errors, touched, setFieldValue, resetForm, setValues }) => (
          <Form layout="vertical" colon={false} preserve={false}>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Field
                  name="first_name"
                  label="First Name"
                  placeholder="Enter name"
                  size="default"
                  component={InputField}
                />
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Field
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter name"
                  size="default"
                  component={InputField}
                />
              </Col>
            </Row>

            <Row className="justify-content-md-start align-items-md-center ">
              <Field
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
                size="default"
                component={InputField}
              />
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Field
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  size="default"
                  component={InputField}
                />
              </Col>
              <Col xs={12} md={6} lg={6} className="mb-0">
                <Field
                  name="status"
                  label="Status"
                  size="default"
                  className="mt-1 d-block"
                  defaultChecked={check}
                  onChange={(values: any) => setCheck(values === true ? 1 : 0)}
                  component={SwitchField}
                  randomeKey={randomeKey}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-end">
              <Col xs lg="4" className="d-flex justify-content-md-end">
                <ResetButton className="me-2">Reset</ResetButton>
                <SubmitButton>{isEdit ? "Update" : "Create"}</SubmitButton>
              </Col>
            </Row>
          </Form>
        )}
      ></Formik>
    </Modal>
  );
};
export default CustomersAddEditModal;
