import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";
import logo from "../../assets/images/real.png"; // eslint-disable-next-line
import PasswordField from "../../components/controls/PasswordField";
import "../../styles/_loginLayout.scss";
import { useParams, useHistory } from "react-router-dom";
import { resitPassword } from "../../api/forgotPassword";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ), //eslint-disable-line
  password_confirmation: Yup.string()
    .required("Please re-enter the password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function ResetPassword() {
  const param: any = useParams();
  const history = useHistory();
  const onSubmit = async (payload: any, setFieldError: any) => {
    try {
      payload = {
        ...payload,
        token: param.token,
      };
      const response = await resitPassword(payload);
      if (response.data.success) {
        message.success(response.data.message);
        history.push("/login");
      }
    } catch (err: any) {
      if (err.response.status === 422) {
        for (const key in err.response.data.errors) {
          setFieldError(key, err.response.data.errors[key][0]);
        }
      }
    }
  };
  return (
    <div>
      <div className="loginPageWrapper">
        <div className="resetCard">
          <Row>
            <Col>
              {/* eslint-disable-next-line */}
              <img className="logo" src={logo} alt="logo" />{" "}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col>
              <div className="loginDetailsContainer">
                <div className="titleContainer">
                  <span>Reset Password</span>
                </div>
                <div className="Login-Details">
                  <Formik
                    initialValues={{
                      password: "",
                      password_confirmation: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, actions) =>
                      onSubmit(values, actions.setFieldError)
                    }
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Field
                          name="password"
                          size="large"
                          placeholder={"Enter your password"}
                          component={PasswordField}
                        />
                        <Field
                          name="password_confirmation"
                          size="large"
                          placeholder={"Re-enter your password"}
                          component={PasswordField}
                        />
                        <Button
                          loading={isSubmitting}
                          htmlType="submit"
                          type="primary"
                          className="mt-4"
                          size={"large"}
                          block
                        >
                          Reset
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

export default ResetPassword;
