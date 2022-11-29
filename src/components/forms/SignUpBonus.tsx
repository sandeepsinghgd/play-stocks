import { Radio, message } from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { getSignUpBonusTypes, updateBonus } from "../../api/globalConfig";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { setSignUpBonus } from "../../redux/actions/bonus";
import InputField from "../controls/InputField";

const SignUpBonus = () => {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const { signupBonus } = useTypedSelector((state) => state.bonus);
  const [signUpBonusValues, setSignUpBonusValues] = useState<any>([]);
  const [signUpBonusTypes, setSignUpBonusTypes] = useState<any>([]);
  const [selectedSignUpBonusType, setSelectedSignUpBonusType] = useState(
    signupBonus[2]?.value
  );
  const { currentUserPermissions } = useTypedSelector((state) => state.user);

  useEffect(() => {
    fetchSignUpBonusTypes();
  }, []);

  useEffect(() => {
    const newSignUpBonus: Array<any> = [];
    if (signupBonus.length) {
      signupBonus.forEach((r: any) => {
        newSignUpBonus.push({
          key: r.key,
          value: r.value,
          description: r.description,
        });
      });
    }
    setSignUpBonusValues(newSignUpBonus);
  }, [signupBonus]);

  const fetchSignUpBonusTypes = async () => {
    const response = await getSignUpBonusTypes();
    setSignUpBonusTypes(response?.data?.result);
  };
  const submit = async (values: any) => {
    for (const property in values) {
      signUpBonusValues.forEach((item: any, index: any) => {
        if (property == item.key) {
          if (property == "SIGNUP_BONUS_TYPE") {
            item.value = selectedSignUpBonusType;
          } else {
            item.value = values[property];
          }
        }
      });
    }

    try {
      const response = await updateBonus(signUpBonusValues);
      if (response.data.success) {
        dispatch(setSignUpBonus(signUpBonusValues));
        message.success(response.data.message);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  const signUpBonusSchema = yup.object().shape({
    SIGNUP_BONUS_AS_MONEY: yup.string()
    .required("This Field is required")
    .matches(
      /^[0-9]+$/,
      "Only numbers are allowed "
    ),
    SIGNUP_BONUS_AS_COIN: yup.string()
    .required("This Field is required")
    .matches(
      /^[0-9]+$/,
      "Only numbers are allowed "
    ),
  });
  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          SIGNUP_BONUS_AS_MONEY: signupBonus[0]?.value,
          SIGNUP_BONUS_AS_COIN: signupBonus[1]?.value,
          SIGNUP_BONUS_TYPE: selectedSignUpBonusType,
        }}
        validationSchema={signUpBonusSchema}
        onSubmit={submit}>
       {() => (
          <Form>
            <Row className="keyBlock">
              <Col xs={12} md={6} lg={6} className="d-flex align-items-center">
                <label style={{ fontSize: "14px" }}>
                  Signup Bonus as money:
                </label>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Field
                  name="SIGNUP_BONUS_AS_MONEY"
                  placeholder="Enter key"
                  size="default"
                  component={InputField}
                />
              </Col>
            </Row>
            <Row className="keyBlock">
              <Col xs={12} md={6} lg={6} className="d-flex align-items-center">
                <label style={{ fontSize: "14px" }}>
                  Signup Bonus as coin:
                </label>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Field
                  name="SIGNUP_BONUS_AS_COIN"
                  placeholder="Enter key"
                  size="default"
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <label className="mt-3" style={{ fontSize: "14px" }}>
                  Select Signup Bonus Type:
                </label>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Radio.Group
                  name="SIGNUP_BONUS_TYPE"
                  defaultValue={signupBonus[2]?.value}
                  onChange={(e) => {
                    setSelectedSignUpBonusType(e.target.value);
                  }}
                  value={selectedSignUpBonusType}
                  className="mt-3"
                >
                  {signUpBonusTypes.map((s: any, i: any) => (
                    <Radio value={s.key} key={s.key}>
                      {s.value}{" "}
                    </Radio>
                  ))}
                </Radio.Group>
              </Col>
            </Row>
            {currentUserPermissions.includes("system_setting_update") && (
              <Row className="d-flex justify-content-end mt-2">
                <Col lg="4" className="d-flex justify-content-md-end">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <SubmitButton>Update</SubmitButton>
                </Col>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignUpBonus;
