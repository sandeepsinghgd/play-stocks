import { Col, message, Row } from "antd";
import { Field, FieldArray, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import React, { useRef } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import {
  createWinningRatio,
} from "../../../../api/groupTrading";
import InputField from "../../../../components/controls/InputField";
import { useTypedSelector } from "../../../../hooks/useTypeSelector";
const PrizeDistributionTab = ({userCount}: any) => {
    const id: any = useParams();
    const newPercentageArray: any = [];
      const { winningRatio } = useTypedSelector((state) => state.prizeDistribution);
         const formikRef = useRef(null);
      const Schema = Yup.object().shape({
        rankFields: Yup.array().of(
          Yup.object().shape({
            percentage: Yup.string().required("This Field is Required").nullable(),
          })
        ),
      });
      const submit = async (values: any) => {
        try{
          values.rankFields.forEach((object: any, i: any) => {
            object.rank = i + 1;
          });
            const payload = {
              group_id: id.id,
              ratios: values.rankFields,
            };
            const response = await createWinningRatio(payload);
            if (response.data.success) {
              message.success(response.data.message);
          }
        }
        catch(err: any){
          if (err) {
            message.error(err.response.data.message);
         }
        }
      }

        for (let i = 0; i < userCount; i++) {
            newPercentageArray.push({ percentage: winningRatio.length == 0 ? null : winningRatio[i]?.percentage!= undefined ? 
              winningRatio[i]?.percentage : 0 });
          }
         return (
        
                <Formik
                  innerRef={formikRef}
                  initialValues={{ rankFields: newPercentageArray }}
                  validationSchema={Schema}
                  onSubmit={(values) => submit(values)}
                >
                  {({ touched, errors }) => {
                return (
                              <Form layout="vertical" colon={false}>
                                <Row>
                                  <Col span={8}  style={{border: "1px dashed #0A3453", padding:"10px", background: "white"}}>
                                  
                                <FieldArray
                                  name="rankFields"
                                  render={() => (
                                    <>
                                      {Array.from({ length: userCount }, (e: any, i: any) => {
                                        return (
                                          <Row key={i} >
                                            <Col xs={12} md={6} lg={6} className="pt-2">
                                              <span
                                                style={{ color: "#0A3453", fontWeight: "400" }}
                                              >{`Rank ${i + 1}:`}</span>
                                            </Col>
                                            <Col xs={12} md={6} lg={12}>
                                              <Field
                                                name={`rankFields.${i}.percentage`}
                                                placeholder="Enter amount in percentage"
                                                size="default"
                                                type="number"
                                                // style={{width: "50%"}}
                                                className={
                                                  "rankFields" in errors &&
                                                  errors.rankFields &&
                                                  // @ts-ignore
                                                  errors?.rankFields[i] &&
                                                  touched.rankFields &&
                                                  // @ts-ignore
                                                  touched.rankFields[i]?.percentage &&
                                                  "Error"
                                                }
                                                component={InputField}
                                              />
                                              {errors.rankFields &&
                                                // @ts-ignore
                                                errors.rankFields[i] &&
                                                // @ts-ignore
                                                errors.rankFields[i].percentage &&
                                                touched.rankFields &&
                                                // @ts-ignore
                                                touched.rankFields[i]?.percentage && (
                                                  // @ts-ignore
                                                  <p className="text-danger Error-Text">{errors.rankFields[i].percentage}
                                                 </p>
                                               )}
                                            </Col>
                                          </Row>
                                        );
                                      })}
                    
                                      <Row className="justify-content-md-end mt-3 ps-6">
                                        <Col className="d-flex justify-content-md-end">
                                          <ResetButton className="me-2">Reset</ResetButton>
                                          <SubmitButton>Submit</SubmitButton>
                                        </Col>
                                      </Row>
                                    </>
                                  )}
                                />
                                </Col>
                                </Row>
                              </Form>
                )
                }}
                    </Formik>
                )
            }
           
                export default PrizeDistributionTab;