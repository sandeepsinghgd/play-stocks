import { Row, Col, message } from "antd";
import { useEffect, useRef } from "react";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import { getMailConfig, updateMailConfig } from "../../../api/globalConfig";
import { Field, Formik } from "formik";
import InputField from "../../../components/controls/InputField";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setEmailSetting } from "../../../redux/actions/emailSetting";

function MailTab() {
  const dispatch = useDispatch();
  const { emailSetting } = useTypedSelector((state) => state.emailSetting);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);

  const configurationSchema = yup.object().shape({
    MAIL_HOST: yup.string().required(),
    MAIL_PORT: yup.string().required(),
    MAIL_MAILER: yup.string().required(),
    MAIL_USERNAME: yup.string().required(),
    MAIL_PASSWORD: yup.string().required(),
    MAIL_ENCRYPTION: yup.string().required(),
  });
  const formikRef = useRef(null);

  useEffect(() => {
    fetchEmailSetting();
  }, []);

  const fetchEmailSetting = async () => {
    const response = await getMailConfig();
    dispatch(setEmailSetting(response.data.result));
  };

  const submit = async (values: any) => {
    try {
      const response = await updateMailConfig(values);
      if (response.data.success) {
        message.success(response.data.message);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  if (Object.keys(emailSetting).length === 0) {
    return null;
  }

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          MAIL_HOST: emailSetting.MAIL_HOST,
          MAIL_MAILER: emailSetting.MAIL_MAILER,
          MAIL_PORT: emailSetting.MAIL_PORT,
          MAIL_USERNAME: emailSetting.MAIL_USERNAME,
          MAIL_PASSWORD: emailSetting.MAIL_PASSWORD,
          MAIL_ENCRYPTION: emailSetting.MAIL_ENCRYPTION,
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
                    Mail Host:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="MAIL_HOST"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Mail Mailer:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="MAIL_MAILER"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Mail Port:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="MAIL_PORT"
                    placeholder="Enter Value"
                    size="large"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Mail Username:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="MAIL_USERNAME"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Mail Password:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="MAIL_PASSWORD"
                    placeholder="Enter Value"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} sm={8} lg={3} className="me-sm-3">
                  <label style={{ fontWeight: "400", color: "#0A3453" }}>
                    Mail Encryption:
                  </label>
                </Col>
                <Col xs={12} sm={8} className="me-sm-3">
                  <Field
                    name="MAIL_ENCRYPTION"
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
}

export default MailTab;
