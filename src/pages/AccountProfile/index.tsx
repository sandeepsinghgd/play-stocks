import React, { useEffect, FC, useState } from "react";
// import { useState } from "react";
import { Row, Col, message, Card } from "antd";
import { Formik, Field } from "formik";
import { Form, SubmitButton } from "formik-antd";
import * as Yup from "yup";
import PasswordField from "../../components/controls/PasswordField";
import { getProfile, changePassword } from "../../api/profile";
import "../../styles/_profile.scss";
import AccountProfileForm from "../../components/forms/AccountProfile";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/actions/user";

const resetPasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Please enter your current password"),
  password: Yup.string().required("Please enter your password"),
  password_confirmation: Yup.string().required(
    "Please Re-enter your new password"
  ),
});

const AccountProfile: FC = () => {
  const { currentUser } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await getProfile();
    dispatch(setCurrentUser(response.data.result));
  };

  const updatePassword = async (values: any) => {
    try {
      const response = await changePassword(values);
      if (response.data.success) {
        message.success(response.data.message);
        setInitialValues({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
      }
    } catch (error) {
      message.destroy();
    }
  };

  if (Object.keys(currentUser).length === 0) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={24} lg={16} className="profileCol">
          <Card title="Account Profile" className="profileCard">
            <AccountProfileForm profileData={currentUser} />
          </Card>
        </Col>
        <Col sm={24} lg={8} className="resetPasswordCol">
          <Card title="Reset Password" className="resetPasswordCard">
            <div className="resetPasswordForm">
              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordSchema}
                onSubmit={(values) => updatePassword(values)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field
                      name="current_password"
                      label="Current Password"
                      size="large"
                      placeholder={"Enter your current password"}
                      className="mb-2"
                      component={PasswordField}
                    />
                    <Field
                      name="password"
                      label="New Password"
                      size="large"
                      placeholder={"Enter your new password"}
                      className="mb-2"
                      component={PasswordField}
                    />
                    <Field
                      name="password_confirmation"
                      label="Confirm Password"
                      size="large"
                      placeholder={"Re-enter your new password"}
                      component={PasswordField}
                    />
                    <Row className="d-flex justify-content-end">
                      <Col>
                        <SubmitButton type="primary" className="mt-3 ps-5 pe-5">
                          Update
                        </SubmitButton>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AccountProfile;
