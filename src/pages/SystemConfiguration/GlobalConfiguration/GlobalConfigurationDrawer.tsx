import { Button, Col, Row, message, DatePicker, TimePicker } from "antd";
import { Field, Formik } from "formik";
import { Form, SubmitButton } from "formik-antd";
import {  useRef, useState } from "react";
import InputField from "../../../components/controls/InputField";
import DrawerComponent from "../../../components/Drawer/DrawerComponent";
import * as yup from "yup";
import { updateGlobalConfig } from "../../../api/globalConfig";
import moment from "moment";
// import { minWithdrawAmount } from "../../../api/notification";

interface GlobalConfigurationDrawerProps {
  onClose?: any;
  visible?: any;
  setting?: any;
  minimumWithdrawAmount?: any;
  maximumWithdrawAmount?: any;
}
const configurationSchema = yup.object().shape({
  key: yup.string().required("Please enter a key."),
  value: yup.string().required("This field is required."),
});
function GlobalConfigurationDrawer(props: GlobalConfigurationDrawerProps) {
  const { onClose, setting, visible } = props;
 
  // const [maxAmount, setMaxAmount] = useState("");
  const [minAmount, setMinAmount] = useState("");

  const formikRef = useRef(null);
  const submit = async (values: any) => {
    try {
      const payload = {
        value: values.value,
        description: values.description,
        id: values.id,
      };

      const response = await updateGlobalConfig(payload);
      if (response.data.success) {
        message.success(response.data.message);
        onClose();
      }
    } catch (err: any) {
      message.error(err);
    }
  };
  
  return (
    <DrawerComponent
      title={"Edit Configuration"}
      visible={visible}
      onClose={onClose}
      destroyOnClose={true}
    >
      <Formik
        innerRef={formikRef}
        initialValues={{
          key: setting?.key,
          value: setting?.value,
          description: setting?.description,
          id: setting?.id,
        }}
        validationSchema={configurationSchema}
        onSubmit={(values) => submit(values)}
      >
        {({ touched, errors, setFieldValue, setFieldTouched, values }) => (
          <>
          {values.key === "MINIMUM_WITHDRAW" && setMinAmount(values.value)}
          {/* {values.key === "MAXIMUM_WITHDRAW" && setMaxAmount(values.value)} */}
            <Form>
              <label>{setting?.description}</label>
              {setting?.key === "NEXT_MARKET_OPENING_DATE" ||
              setting?.key === "PREV_MARKET_OPEN_DATE" ? (
                <>
                  <DatePicker
                    name="value"
                    defaultValue={moment(setting?.value)}
                    className={`${
                      touched.value && errors.value && "Error"
                    } d-block`}
                    onChange={(date: any, dateString: any) => {
                      setFieldValue("value", dateString);
                    }}
                    onBlur={() => {
                      setFieldTouched("value");
                    }}
                  />
                  <>
                    {errors.value && touched.value ? (
                      <p className="text-danger Error-Text">{errors.value}</p>
                    ) : null}
                  </>
                </>
              ) : setting?.key === "MARKET_OPEN_TIME" ||
                setting?.key === "MARKET_ClOSE_TIME" ? (
                <>
                  <TimePicker
                    className={`${
                      touched.value && errors.value && "Error"
                    } d-block`}
                    name="value"
                    onChange={(time: any, timeString: any) => {
                      setFieldValue("value", timeString);
                    }}
                    defaultValue={moment(setting?.value, "HH:mm:ss")}
                    onBlur={() => {
                      setFieldTouched("value");
                    }}
                  />
                  <>
                    {errors.value && touched.value ? (
                      <p className="text-danger Error-Text">{errors.value}</p>
                    ) : null}
                  </>
                </>
              ) : (
                <Field
                  type={setting?.key === "ANDROID_VERSION" || setting?.key === "IOS_VERSION" ? "text" : "number"}
                  name="value"
                  placeholder="Enter Value"
                  size="default"
                  defaultValue={setting?.value}
                  // value={setting?.value}
                  component={InputField}
                  className={`Form-Input ${
                    (errors.value &&
                      typeof errors.key !=
                        "undefined" &&
                      Object.prototype.hasOwnProperty.call(
                        errors.key,
                        "key"
                      ) &&
                      "Error") 
                      ||(props.maximumWithdrawAmount <
                        minAmount &&
                        "Error") 
                        // || (minimumWithdrawAmount > maxAmount &&
                        //   "Error") 
                        
                  }`}
                />
              )}
              {values.key=== "MINIMUM_WITHDRAW" && values.value > props.maximumWithdrawAmount 
              && <> <p className="text-danger Error-Text ">Minimum withdraw amount must be less than Maximum withdraw amount </p> </> }

              {values.key=== "MAXIMUM_WITHDRAW" && values.value < props.minimumWithdrawAmount 
              && <> <p className="text-danger Error-Text ">Maximum withdraw amount must be less than Minimum withdraw amount </p> </> }
              
              <Row gutter={4} className="d-flex justify-content-end mt-3">
                <Col>
                  <Button
                    type="dashed"
                    className="me-2 rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <SubmitButton>Save</SubmitButton>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Formik>
    </DrawerComponent>
  );
}

export default GlobalConfigurationDrawer;
