import { Row, Col } from "react-bootstrap";
import logo from "../../assets/images/real.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, message } from "antd";
import InputField from "../../components/controls/InputField";
import "../../styles/_loginLayout.scss";
import { forgotPassword } from "../../api/forgotPassword";
import { useHistory } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter your email"),
});

function ForgotPassword() {
  const history = useHistory();
  const onSubmit = async (payload: any, setFieldError: any) => {
    try {
      const response = await forgotPassword(payload);
      if (response.data.success) {
        message.success(response.data.message);
        history.push("/login");
      }
    } catch (err: any) {
      if (err.response.status === 422) {
        for (const key in err.response.data.errors) {
          setFieldError("email", err.response.data.errors[key][0]);
        }
      }
    }
  };
  return (
    <div>
      <div className="loginPageWrapper">
        <div className="forgotPasswordCard">
          <Row>
            <Col>
              <img className="logo" src={logo} alt="logo" />
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col>
              <div className="loginDetailsContainer">
                <div className="titleContainer">
                  <span>Trouble Logging in?</span>
                </div>
                <div>
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, actions) =>
                      onSubmit(values, actions.setFieldError)
                    }
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Field
                          name="email"
                          placeholder="Enter your email"
                          size="large"
                          component={InputField}
                          autoFocus
                        />
                        <Button
                          loading={isSubmitting}
                          htmlType="submit"
                          type="primary"
                          className="mt-4"
                          size={"large"}
                          block
                        >
                          Send Login Link
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
