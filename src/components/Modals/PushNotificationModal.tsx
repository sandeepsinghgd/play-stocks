import { message, Modal, Typography } from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import { FC, useRef } from "react";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";
import InputField from "../controls/InputField";
import TextAreaField from "../controls/TextAreaField";
import { createPushNotification } from "../../api/pushNotifications";

interface IEditPublicFormProps {
  Notification?: any;
  onClose?: any;
  onSubmit?: any;
  visible?: boolean;
  setVisibility?: any;
  onSuccess?: any;
  title?: any;
}
const { Title } = Typography;

const editModalSchema = Yup.object().shape({
  description: Yup.string().required("Message field is Required"),
  title: Yup.string().required("Title field is Required"),
});

const PushNotificationModal: FC<IEditPublicFormProps> = ({
  Notification,
  onClose,
  onSubmit,
  visible,
  setVisibility,
  title,
  onSuccess,
}) => {
  const formikRef = useRef(null);

  const initialValues = {
    title: "",
    description: "",
  };

  const submit = async (values: any, setFieldError: any) => {
    try {
      let response; // eslint-disable-line

      message.loading("Creating notification...", 0);
      response = await createPushNotification(values); // eslint-disable-line

      message.destroy();

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
        onClose();
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
        {({ setFieldValue }) => {
          return (
            <Form layout="vertical" colon={false}>
              <Row>
                <Col>
                  <Field
                    name="title"
                    label="Title"
                    placeholder="Please Enter Title"
                    size="default"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field
                    name="description"
                    label="Message"
                    placeholder="Please Enter Message"
                    size="default"
                    component={TextAreaField}
                  />
                </Col>
              </Row>

              <Row className="justify-content-md-end mt-2">
                <Col xs lg="4" className="d-flex justify-content-md-end">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <SubmitButton>Create</SubmitButton>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default PushNotificationModal;
