import { Card, message } from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  getLoginDelayNotification,
  updateLoginDelayNotification,
} from "../../api/pushNotifications";
import InputField from "../../components/controls/InputField";
import SelectField from "../../components/controls/SelectField";
import SwitchField from "../../components/controls/SwitchField";
import TextAreaField from "../../components/controls/TextAreaField";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { setDelayNotification } from "../../redux/actions/notification";
import ManualPushNotifications from "./ManualPushNotifications";

const notificationSchema = Yup.object().shape({
  title: Yup.string().required("Please Enter Title"),
  message: Yup.string().required("Please Enter Message"),
  days: Yup.number().required("Number of days field is required").nullable(),
});

const NotificationViewPage = () => {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({});
  const { delayNotification } = useTypedSelector(
    (state) => state.notifications
  );
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const [day, setDay] = useState(delayNotification?.days);
  const [check, setCheck] = useState(delayNotification?.is_send);
  const [randomeKey, setRandomKey] = useState("");

  useEffect(() => {
    fetchLoginDelayNotification();
  }, []);
  const fetchLoginDelayNotification = async () => {
    const resp = await getLoginDelayNotification();
    const result = resp.data.result;
    setData(result);
    dispatch(setDelayNotification(result));
  };

  const initialValues = {
    id: data?.id,
    title: data?.title,
    message: data?.message,
    days: data?.days,
    is_send: data?.is_send,
  };

  const submit = async (values: any, setFieldError: any) => {
    try {
      let response;
      values = {
        ...values,
        is_send: check,
        days: day,
      };

      if (values.id) {
        response = await updateLoginDelayNotification(values);
        fetchLoginDelayNotification();
        message.destroy();
      }

      if (response?.data?.success) {
        message.success(response.data.message);
        // onSubmit();
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

  const children: any[] = [];
  for (let i = 1; i < 21; i++) {
    const obj: any = {};

    obj.id = i;
    obj.name = i;
    children.push(obj);
  }

  if (
    Object.keys(initialValues).length === 0 ||
    (typeof data != "undefined" && Object.keys(data).length === 0)
  ) {
    return null;
  }

  return (
    <>
      <Card size="small" className="mb-5">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={notificationSchema}
          onSubmit={(values, actions) => submit(values, actions.setFieldError)}
          onReset={(setFieldValue) => {
            setCheck(1)
            setRandomKey(Math.random().toString(36));
          }}
        >
          {({ setFieldValue, setFieldTouched }) => {
            return (
              <Form>
                <Row className="pb-2 editTitle">
                  <Col xs={12} md={6} lg={6}>
                    <h6 className="pt-2">Last Login Push Notification</h6>
                  </Col>
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="d-flex justify-content-md-end"
                  >
                    {currentUserPermissions.includes(
                      "send_push_notification"
                    ) && (
                      <>
                        <ResetButton className="me-2">Reset</ResetButton>
                        <SubmitButton>Update</SubmitButton>
                      </>
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={12} md={6} lg={5}>
                    <Field
                      name="title"
                      label="Title"
                      placeholder="Enter Title"
                      size="default"
                      component={InputField}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4} className="mt-1">
                    <Field
                      name="days"
                      label="Select number of days"
                      placeholder="select number of days"
                      size="small"
                      component={SelectField}
                      options={children}
                      defaultValue={day}
                      value={day}
                      onChange={(val: any, option: any) => {
                        setDay(val);
                        setFieldValue("days", val);
                      }}
                      onBlur={() => {
                        setFieldTouched("days");
                      }}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Field
                      name="is_send"
                      style={{ backgroundColor: check ? "#0A3453" : "lightgray" }}
                      label="Status"
                      size="default"
                      className="mt-1 d-block"
                      defaultChecked={check}
                      onChange={(values: any) =>
                        setCheck(values === true ? 1 : 0)
                      }
                      component={SwitchField}
                      randomeKey={randomeKey}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={5}>
                    <Field
                      name="message"
                      label="Message"
                      placeholder="Enter Message"
                      size="default"
                      component={TextAreaField}
                    />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Card>
      <ManualPushNotifications />
    </>
  );
};

export default NotificationViewPage;
