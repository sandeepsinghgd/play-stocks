import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/real.png"; //eslint-disable-line
import InputField from "../../components/controls/InputField";
import PasswordField from "../../components/controls/PasswordField";
import { setToken } from "../../redux/actions/auth";
import {
  setCurrentUser,
  setCurrentUserPermissionModules,
  setCurrentUserPermissionSlugs,
} from "../../redux/actions/user";

import "../../styles/_loginLayout.scss";
import { authenticateUser } from "../../api/auth";
import { saveAuth, secretKey } from "../../utils/helpers";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

function LogIn() {
  const dispatch = useDispatch();

  const onSubmit = async (payload: any) => {
    try {
      const response = await authenticateUser(payload);
      if (response?.data) {
        if (response.status === 401) {
          message.error("Invalid email or password");
          return false;
        }

        saveAuth(response.data.result.access_token);
        secretKey(response.data.result.user_secret);

        dispatch(setCurrentUser(response.data.result));
        dispatch(
          setToken({
            token: response.data.result.access_token,
            isUserAuthenticated: true,
          })
        );
        if (response?.data?.result?.role) {
          const permissions = response?.data?.result?.role?.permissions;
          const slugPermissions = permissions.map((p: any) => {
            return p.slug;
          });
          dispatch(setCurrentUserPermissionSlugs(slugPermissions));
        }
        if (response?.data?.result?.role) {
          const permissions = response?.data?.result?.role?.permissions;
          const newPermissions: Array<any> = [];
          permissions.map(
            (p: any) =>
              !newPermissions.includes(p?.module?.name) &&
              p?.module?.name != undefined &&
              newPermissions.push(p?.module?.name)
          );
          dispatch(setCurrentUserPermissionModules(newPermissions));
        }
      }
    } catch (err: any) {
      if (err.response?.data) {
        if (err.response.status === 401) {
          message.error("Invalid email or password");
        }
      }
    }
  };

  return (
    <div>
      <div className="loginPageWrapper">
        <div className="loginCard">
          <Row>
            <Col>
              <img className="logo" src={logo} alt="logo" />
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col>
              <div className="loginDetailsContainer">
                <div className="titleContainer">
                  <span>Sign In</span>
                  <small>to continue using Admin Portal</small>
                </div>
                <div className="loginForm">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={onSubmit}
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
                        <Field
                          name="password"
                          size="large"
                          placeholder={"Enter your password"}
                          component={PasswordField}
                        />
                        <Button
                          loading={isSubmitting}
                          htmlType="submit"
                          type="primary"
                          className="mt-3 loginBtnStyle"
                          size={"large"}
                          block
                        >
                          Login
                        </Button>
                        <Button type="link" className="ps-0 btn-link">
                          <Link to={"/forgot-password"}>Forgot Password?</Link>
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

export default LogIn;
