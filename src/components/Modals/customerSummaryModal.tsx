import React, { FC, useEffect, useRef, useState } from "react";
import { Modal, Typography, message } from "antd";
import { Formik, Field } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import InputField from "../controls/InputField";
import * as yup from "yup";
import { Col, Row } from "react-bootstrap";
import { updateCustomer } from "../../api/customer";
interface ICustomerSummaryModalProps {
  title?: any;
  profileData?: any;
  isModalVisible?: boolean;
  setIsModalVisible?: any;
  isEdit?: any;
  onClose?: any;
  onSubmit?: any;
}
const { Title } = Typography;
const phoneRegExp = /^[1-9][0-9]{9}$/;

const editModalSchema = yup.object().shape({
  first_name: yup.string().required("Please enter first name."),
  last_name: yup.string().required("Please enter last name."),
  email: yup.string().email().required("Please enter an email."),
  // phone: yup
  // .string()
  // .required("Phone Number is Required")
  // .phone("IN", true, "Invalid Phone Number"),

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

const CustomerSummaryModal: FC<ICustomerSummaryModalProps> = ({
  profileData,
  isModalVisible,
  setIsModalVisible,

  onSubmit,
}) => {
  const formikRef = useRef(null);
  const entity = "Customer";
  const [check, setCheck] = useState(1);

  const initialValues = {
    id: profileData?.id,
    first_name: profileData?.first_name,
    last_name: profileData?.last_name,
    email: profileData?.email,
    phone: profileData?.phone,
    status: profileData?.status,
  };

  useEffect(() => {
    if (profileData.status !== undefined) {
      setCheck(profileData.status);
    }
  }, [profileData?.status]);

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
      }
      // else {
      // response = await createCustomer(values);
      // }
      if (response?.data?.success) {
        message.success(response.data.message);
        setIsModalVisible(false);
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
          Update Customer Details
        </Title>
      }
      visible={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      footer={null}
      destroyOnClose
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={editModalSchema}
        onSubmit={(values, actions) => submit(values, actions.setFieldError)}
      >
        <Form layout="vertical" colon={false}>
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

          <Field
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            size="default"
            component={InputField}
          />
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
          </Row>
          {/* <Row>
            <Col className="mt-3">
              <Field
                name="status"
                label="Status"
                size="default"
                className="mt-1 d-block"
                defaultChecked={check}
                onChange={(values: any) => setCheck(values === true ? 1 : 0)}
                component={SwitchField}
              />
            </Col>
          </Row> */}
          <Row className="justify-content-md-end">
            <Col xs lg="4" className="d-flex justify-content-md-end">
              <ResetButton className="me-2">Reset</ResetButton>
              <SubmitButton>Update</SubmitButton>
            </Col>
          </Row>
        </Form>
      </Formik>
    </Modal>
  );
};
export default CustomerSummaryModal;
