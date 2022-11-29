import React, { FC, useEffect, useRef, useState } from "react";
import { Modal, Typography, message } from "antd";
import { Formik, Field } from "formik";
import { Form, ResetButton } from "formik-antd";
import InputField from "../controls/InputField";
import * as Yup from "yup";
import "yup-phone";

import {
  createAdminUsers,
  loadRoles,
  updateAdminUsers,
} from "../../api/adminUser";
import SwitchField from "../controls/SwitchField";
import SelectField from "../controls/SelectField";
import { Row, Col } from "react-bootstrap";
import "../../styles/_adminUsers.scss";

interface IEditPublicFormProps {
  title?: any;
  first_name?: any;
  user?: any;
  form?: any;
  visible?: boolean;
  setVisibility?: any;
  onSuccess?: any;
  last_name?: any;
  email?: any;
  phone?: any;
  password?: any;
  status?: any;
  role?: any;
  isEdit?: any;
  editId?: any;
  onClose?: any;
  onSubmit?: any;
  errors?: any;
  setActionPerform?: any;
}
const { Title } = Typography;
const entity = "admin user";

const EditModalForm: FC<IEditPublicFormProps> = ({
  title,
  visible,
  setVisibility,
  isEdit,
  user,
  onClose,
  onSubmit,
}) => {
  const formikRef = useRef(null);
  const [check, setCheck] = useState(1);
  const [role, setRole] = useState(null);
  const [LoadRoles, setLoadRoles] = useState([]);
  const [randomeKey, setRandomKey] = useState("");
  const phoneRegExp = /^[1-9][0-9]{9}$/;

  const editModalSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is Required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed as first name."), //eslint-disable-line
    last_name: Yup.string()
      .required("Last Name is Required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed as last name."), //eslint-disable-line
    email: Yup.string().email("Invalid email").required("Email is Required."),
    role_id: Yup.number().required("Role is required").nullable(),
    phone: Yup.string()
      .required("Phone Number is Required.")
      .matches(phoneRegExp, "Phone number is not valid.")
      .test(
        "It is",
        "Phone number must contain 10 digits only.",
        (value: any) => value?.length === 10
      ),
    password: isEdit
      ? Yup.string()
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
            "Must Contain One Uppercase, One Lowercase, One Number and one special case Character."
          )
      : Yup.string()
          .required("Password is required.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
            "Must Contain One Uppercase, One Lowercase, One Number and one special case Character."
          ),
  });
  const initialValues = {
    id: user?.id ? user.id : null,
    first_name: user?.first_name ? user.first_name : "",
    last_name: user?.last_name ? user.last_name : "",
    email: user?.email ? user.email : "",
    phone: user?.phone ? user.phone : "",
    password: user?.password ? user.password : "",
    role_id: user?.role_id ? user.role_id : role,
  };

  useEffect(() => {
    if (user.status !== undefined) {
      setCheck(user.status);
    }
  }, [user?.status]);

  useEffect(() => {
    if (user.role !== undefined) {
      setRole(user.role.id);
    }
  }, [user?.role]);

  const submit = async (values: any, setFieldError: any) => {
    try {
      let response;
      values = {
        ...values,
        status: check,
        role_id: role,
      };

      if (values.id) {
        message.loading(`Updating ${entity}...`, 0);
        response = await updateAdminUsers(values);
        message.destroy();
      } else {
        message.loading(`Creating ${entity}...`, 0);
        response = await createAdminUsers(values);

        message.destroy();
      }

      if (response.data.success) {
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

  const fetchRoles = async () => {
    const resp = await loadRoles();
    setLoadRoles(resp?.data?.result);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

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
        onClose(setRole(null));
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
        onReset={() => {
          setCheck(1);
          setRole(null);
          setRandomKey(Math.random().toString(36));
        }}
        render={({
          values,
          handleSubmit,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form layout="vertical" colon={false}>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <Field
                    name="first_name"
                    label="First Name"
                    placeholder="Enter First Name"
                    size="default"
                    component={InputField}
                  />
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <Field
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row>
                <Field
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  size="default"
                  autoComplete="off"
                  component={InputField}
                />
              </Row>
              <Row>
                <Field
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  size="default"
                  component={InputField}
                />
              </Row>
              <Row>
                <Field
                  name="password"
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  size="default"
                  autoComplete="new-password"
                  component={InputField}
                />
              </Row>

              <Row>
                <Field
                  name="role_id"
                  label="Role"
                  placeholder="Select Role"
                  size="default"
                  component={SelectField}
                  options={LoadRoles}
                  defaultValue={role}
                  value={role}
                  onChange={(val: any, option: any) => {
                    setRole(val);
                    setFieldValue("role_id", val);
                  }}
                  onBlur={() => {
                    setFieldTouched("role_id");
                  }}
                />
              </Row>
              <Row className="justify-content-md-start align-items-md-center mt-3">
                <Col xs={4} md={4} lg={4}>
                  <Field
                    name="status"
                    label="Status"
                    size="default"
                    className="mt-1 d-block"
                    style={{ backgroundColor: check ? "#0A3453" : "lightgray" }}
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
                  {/* <SubmitButton>{isEdit ? "Update" : "Create"}</SubmitButton> */}
                  <button type="submit" className="p-1 submitBtn">
                    {isEdit ? "Update" : "Create"}
                  </button>
                </Col>
              </Row>
            </Form>
          );
        }}
      />
    </Modal>
  );
};

export default EditModalForm;
