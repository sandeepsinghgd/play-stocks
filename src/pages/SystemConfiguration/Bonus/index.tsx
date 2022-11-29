import { Card, Radio, message } from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getRefferalBonusFor,
  getRefferalBonusTypes,
  updateBonus,
} from "../../../api/globalConfig";
import InputField from "../../../components/controls/InputField";
import SignUpBonus from "../../../components/forms/SignUpBonus";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { setReferralBonus } from "../../../redux/actions/bonus";
import * as yup from "yup";
import "../../../styles/_bonus.scss";
import BonusSwitch from "./BonusSwitch";

const Bonus = () => {
  const { refferalBonus } = useTypedSelector((state) => state.bonus);
  const [refferalBonusTypes, setRefferalBonusTypes] = useState<any>([]);
  const [selectedRefferalBonusType, setSelectedRefferalBonusType] = useState(
    refferalBonus[4]?.value
  );
  const [selectedRefferalBonusFor, setSelectedRefferalBonusFor] = useState(
    refferalBonus[5]?.value
  );
  const [refferalBonusFor, setRefferalBonusFor] = useState<any>([]);
  const [refferalBonusValues, setRefferalBonusValues] = useState<any>([]);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const ReferralBonusSchema = yup.object().shape({
    REFFERAL_BONUS_TO_INVITER_AS_MONEY: yup
      .string()
      .required("This Field is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed "),
    REFFERAL_BONUS_TO_INVITER_AS_COIN: yup
      .string()
      .required("This Field is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed "),
    REFFERAL_BONUS_TO_INVITEE_AS_MONEY: yup
      .string()
      .required("This Field is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed "),
    REFFERAL_BONUS_TO_INVITEE_AS_COIN: yup
      .string()
      .required("This Field is required")
      .matches(/^[0-9]+$/, "Only numbers are allowed "),
  });

  const fetchRefferalBonusTypes = async () => {
    const response = await getRefferalBonusTypes();
    setRefferalBonusTypes(response?.data?.result);
  };

  const fetchRefferalBonusFor = async () => {
    const response = await getRefferalBonusFor();
    setRefferalBonusFor(response?.data?.result);
  };

  useEffect(() => {
    const newRefferalBonus: Array<any> = [];
    if (refferalBonus.length) {
      refferalBonus.map((r: any) =>
        newRefferalBonus.push({
          key: r.key,
          value: r.value,
          description: r.description,
        })
      );
    }
    setRefferalBonusValues(newRefferalBonus);
  }, [refferalBonus]);

  useEffect(() => {
    fetchRefferalBonusTypes();
  }, []);

  useEffect(() => {
    fetchRefferalBonusFor();
  }, []);

  const submit = async (values: any) => {
    for (const property in values) {
      refferalBonusValues.forEach((item: any, index: any) => {
        if (property == item.key) {
          if (property == "REFFERAL_BONUS_TYPE") {
            item.value = selectedRefferalBonusType;
          } else if (property == "REFFERAL_BONUS_FOR") {
            item.value = selectedRefferalBonusFor;
          } else {
            item.value = values[property];
          }
        }
      });
    }

    try {
      const response = await updateBonus(refferalBonusValues);
      if (response.data.success) {
        dispatch(setReferralBonus(refferalBonusValues));
        message.success(response.data.message);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={6}>
          <Card
            extra={<BonusSwitch />}
            title={<span style={{ color: "#0A3453start" }}>Sign-up Bonus</span>}
            style={{ border: "1px solid #0A3453", color: "#0A3453" }}
          >
            <SignUpBonus />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Card
            title={<span style={{ color: "#0A3453" }}>Referral Bonus</span>}
            style={{ border: "1px solid #0A3453" }}
          >
            <Formik
              initialValues={{
                REFFERAL_BONUS_TO_INVITER_AS_MONEY: refferalBonus[0]?.value,
                REFFERAL_BONUS_TO_INVITER_AS_COIN: refferalBonus[1]?.value,
                REFFERAL_BONUS_TO_INVITEE_AS_MONEY: refferalBonus[2]?.value,
                REFFERAL_BONUS_TO_INVITEE_AS_COIN: refferalBonus[3]?.value,
                REFFERAL_BONUS_TYPE: selectedRefferalBonusType,
                REFFERAL_BONUS_FOR: selectedRefferalBonusFor,
              }}
              validationSchema={ReferralBonusSchema}
              onSubmit={(values) => submit(values)}
            >
              {() => (
                <Form>
                  <Row className="keyBlock">
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      className="d-flex align-items-center"
                    >
                      <label className="labelStyling">
                        Referral Bonus for Inviter as money:
                      </label>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="REFFERAL_BONUS_TO_INVITER_AS_MONEY"
                        placeholder="Enter key"
                        size="default"
                        component={InputField}
                        // onChange={(val: any) => {}}
                      />
                    </Col>
                  </Row>
                  <Row className="keyBlock">
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      className="d-flex align-items-center"
                    >
                      <label className="labelStyling">
                        Referral Bonus for Inviter as coin:
                      </label>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="REFFERAL_BONUS_TO_INVITER_AS_COIN"
                        placeholder="Enter key"
                        size="default"
                        component={InputField}
                      />
                    </Col>
                  </Row>
                  <Row className="keyBlock">
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      className="d-flex align-items-center"
                    >
                      <label className="labelStyling">
                        Referral Bonus for Invitee as money:
                      </label>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="REFFERAL_BONUS_TO_INVITEE_AS_MONEY"
                        placeholder="Enter key"
                        size="default"
                        component={InputField}
                      />
                    </Col>
                  </Row>
                  <Row className="keyBlock">
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      className="d-flex align-items-center"
                    >
                      <label className="labelStyling">
                        Referral Bonus for Invitee as coin:
                      </label>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="REFFERAL_BONUS_TO_INVITEE_AS_COIN"
                        placeholder="Enter key"
                        size="default"
                        component={InputField}
                      />
                    </Col>
                  </Row>
                  <Row className="keyBlock">
                    <Col xs={12} md={6} lg={6}>
                      <label className="mt-3 labelStyling">
                        Select Referral Bonus Type:
                      </label>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Radio.Group
                        name="REFFERAL_BONUS_TYPE"
                        onChange={(e) => {
                          setSelectedRefferalBonusType(e.target.value);
                        }}
                        value={selectedRefferalBonusType}
                        className="mt-3"
                      >
                        {refferalBonusTypes.map((r: any, i: any) => (
                          <Radio value={r.key} key={r.key}>
                            {r.value}{" "}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} lg={6}>
                      <label className="mt-3 labelStyling">
                        {" "}
                        Select Referral Bonus For:
                      </label>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Radio.Group
                        name="REFFERAL_BONUS_FOR"
                        onChange={(e) => {
                          setSelectedRefferalBonusFor(e.target.value);
                        }}
                        value={selectedRefferalBonusFor}
                        className="mt-3"
                      >
                        {refferalBonusFor.map((r: any, i: any) => (
                          <Radio value={r.key} key={i}>
                            {" "}
                            {r.value}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Col>
                  </Row>
                  {currentUserPermissions.includes("system_setting_update") && (
                    <Row className="justify-content-md-end mt-2">
                      <Col xs lg="4" className="d-flex justify-content-md-end">
                        <ResetButton className="me-2">Reset</ResetButton>
                        <SubmitButton>Update</SubmitButton>
                      </Col>
                    </Row>
                  )}
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Bonus;
