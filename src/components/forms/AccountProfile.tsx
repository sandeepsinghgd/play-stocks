import { FC } from "react";
import { Formik, Form, Field } from "formik";
import { Row, Col, message } from "antd";
import InputField from "../../components/controls/InputField";
import * as Yup from "yup";
import { SubmitButton } from "formik-antd";
import { updateProfile } from "../../api/profile";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Please enter your first name"),
  last_name: Yup.string().required("Please enter your last name"),
  // mobile: Yup.string().test('len', 'Mobile number must be of exactly 10 digits', (val):any => val.length == 10).required("Please enter your mobile number"),
});

interface AccountProfileProps {
  profileData: any;
}

const AccountProfile: FC<AccountProfileProps> = (props) => {
  const initialValues = {
    first_name: props.profileData.first_name
      ? props.profileData.first_name
      : "",
    last_name: props.profileData.last_name ? props.profileData.last_name : "",
    email: props.profileData.email ? props.profileData.email : "",
    phone: props.profileData.phone ? props.profileData.phone : "",
  };

  const submit = async (values: any) => {
    try {
      const response = await updateProfile(values);
      if (response.data.success) {
        message.success(response.data.message);
      }
    } catch (error) {
      message.destroy();
    }
  };

  return (
    <div className="profileForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => submit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col xs={24} sm={12} className="pe-md-2">
                <Field
                  name="first_name"
                  label="First Name"
                  placeholder="Enter first name"
                  size="large"
                  component={InputField}
                  autoFocus
                  value="asdklas"
                />
              </Col>
              <Col xs={24} sm={12} className="ps-md-2">
                <Field
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter last name"
                  size="large"
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={12} className="pe-md-2">
                <Field
                  name="email"
                  label="Email"
                  size="large"
                  placeholder={"Enter email"}
                  readOnly
                  component={InputField}
                />
              </Col>
              <Col xs={24} sm={12} className="ps-md-2">
                <Field
                  name="phone"
                  label="Mobile Number"
                  size="large"
                  placeholder={"Enter mobile number"}
                  component={InputField}
                />
              </Col>
            </Row>
            <Row gutter={4} className="d-flex justify-content-end">
              <Col>
                <SubmitButton className="mt-3 ps-5 pe-5">Update</SubmitButton>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountProfile;
