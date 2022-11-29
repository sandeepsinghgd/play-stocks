import { Col, message, Row } from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import React, { useEffect, useRef } from "react";
import InputField from "../../../components/controls/InputField";
import * as yup from "yup";
import { getKiteDetails, updateKiteDetails } from "../../../api/kiteConfig";
import { setKiteData } from "../../../redux/actions/kiteData";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypeSelector";

const Token = () => {
  const dispatch = useDispatch();
  const { kiteData } = useTypedSelector((state) => state.kiteReducer);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const configurationSchema = yup.object().shape({
    api_key: yup.string().required("API key is required field"),
    secret_key: yup.string().required("Secret key is required field"),
    username: yup.string().required("Username is required field"),
    password: yup.string().required("Password is required field"),
    pin: yup.string().required("Pin is required field").matches(/^[0-9]+$/, "Only numbers are allowed "),
    access_token: yup.string().required("Access token is required field"),
  });
  const formikRef = useRef(null);

  useEffect(() => {
    fetchKiteDetails();
  }, []);

  const fetchKiteDetails = async () => {
    const response = await getKiteDetails();
    dispatch(setKiteData(response.data.result));
  };
  const submit = async (values: any) => {
    try {
      const response = await updateKiteDetails(values);
      if (response.data.success) {
        message.success(response.data.message);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  if (Object.keys(kiteData).length === 0) {
    return null;
  }

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          api_key: kiteData.api_key,
          secret_key: kiteData.secret_key,
          username: kiteData.username,
          password: kiteData.password,
          pin: kiteData.pin,
          access_token: kiteData.access_token,
        }}
        validationSchema={configurationSchema}
        onSubmit={(values) => submit(values)}
      >
        {() => (
          <>
            <Form>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    API Key:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="api_key"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Secret Key:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="secret_key"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Username:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="username"
                    placeholder="Enter Value"
                    size="large"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Password:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="password"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Pin:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="pin"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Access Token:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="access_token"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                 TOTP Token:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="totp_token"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              {currentUserPermissions.includes(
                "system_setting_update"
              ) && (
              <Row gutter={4} className="d-flex justify-content-end">
                <Col lg="4" className="d-flex justify-content-end mt-2">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <SubmitButton>Update</SubmitButton>
                </Col>
              </Row>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default Token;
