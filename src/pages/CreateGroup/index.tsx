import React, { FC, useEffect, useRef, useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Button, Card, message, Typography } from "antd";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import * as Yup from "yup";
import { createGroup, updateGroup } from "../../api/groupTrading";
import { Col, Row } from "react-bootstrap";
import InputField from "../../components/controls/InputField";
import SwitchField from "../../components/controls/SwitchField";
import "../../styles/createGroupTrading.scss";
import { Link } from "react-router-dom";
interface IEditPublicFormProps {
  title?: any;
  group?: any;
  visible?: boolean;
  setVisibility?: any;
  isEdit?: any;
  onClose?: any;
  onSubmit?: any;
  stockList?: any;
  setCreateContest?: any;
  createContest?: any;
  setDraw?: any;
  draw?: any;
  setActionPerform?: any;
}

const groupTradingModalSchema = Yup.object().shape(
  {
    name: Yup.string().required("Please enter a group name."),
    amount: Yup.number()
      .positive("Amount must be positive number.")
      .integer()
      .required("Please enter amount."),
    round_limit: Yup.number()
      .moreThan(0, "Rounds Limit can't be a negative or zero value.")
      .integer("Rounds limit only allow digits.")
      .required("Please enter rounds limit."),
    winning_limit: Yup.number()
      .moreThan(0, "Winning Limit can't be a negative or zero value.")
      .required("Please enter winning limit."),
    winning_amount: Yup.number()
      .positive()
      .moreThan(0, "Winning Amount can't be a negative or zero value.")
      .required("Please enter winning amount."),
    system_commission: Yup.number()
      .nullable()
      .when("system_commission", (val, schema) => {
        if (val) {
          if (val >= 0 && val <= 100) {
            return Yup.number();
          } else {
            return Yup.number()
              .moreThan(0, "System Commission must be between 0 to 100")
              .lessThan(100, "System Commission must be between 0 to 100");
          }
        } else {
          return Yup.number().notRequired().nullable();
        }
      })
      // .when("system_commission", {
      //   is: (value: any) => value?.length,
      //   then: (rule) => rule.min(3),
      // })
      // .test(
      //   "It is",
      //   "System Commission must be between 0 to 100",
      //   (value: any) => value >= 0 && value <= 100
      // )
      .notRequired(),
    minimum_player: Yup.number()
      .required()
      .positive()
      .moreThan(0, "Minimum Player can't be less or equal than zero."),
    // .lessThan(
    //   Yup.ref("maximum_player"),
    //   "Minimum Player must be less than maximum player"
    // ),
    maximum_player: Yup.number()
      .positive()
      // .moreThan(0, "Maximum Player can't be a negative value.")
      .required("Please enter maximum player.")
      .moreThan(
        Yup.ref("minimum_player"),
        "Maximum Player must be greater than minimum player"
      ),
    guaranteed_user: Yup.number()
      .positive()
      .moreThan(0, "Guaranteed User can't be a negative value."),
    is_guaranteed_return: Yup.number(),
    reward: Yup.array(
      Yup.object({
        min_rank: Yup.number()
          .positive()
          .moreThan(0, "Minimum Rank can't be negative or zero.")

          // .lessThan(Yup.ref("max_rank"), "Minimum Player must be less than maximum rank")

          .required("minimum rank required"),
        max_rank: Yup.number()
          .positive()
          .moreThan(0, "Maximum Rank must be more than zero.")
          .moreThan(
            Yup.ref("min_rank"),
            "Maximum rank must be more than minimum rank "
          ),
        amount: Yup.number()
          .required("Please enter amount.")
          .positive()
          .moreThan(0, "Amount can't be a negative value."),
      }).test("valid-rank", "Entered Invalid Rank", function (value: any) {
        const { path, parent: rewards, createError } = this;
        const index = parseInt(path.split("[")[1].split("]")[0], 10);

        if (index == 0) {
          if (value.min_rank != 1) {
            return createError({
              path: `${path}.min_rank`,
              message: "Min Rank must be start with 1",
            });
          }

          return true;
        }

        const lastIndex = index - 1;

        const lastRange: any = rewards[lastIndex];
        const lastRank: any = lastRange.max_rank || lastRange.min_rank;
        const newIndexStartwith: any = lastRank + 1;

        if (value.min_rank != newIndexStartwith) {
          return createError({
            path: `${path}.min_rank`,
            message: `Min rank must be start with ${newIndexStartwith}`,
          });
        }

        return true;
      })
    ),
  },
  [
    // Add Cyclic deps here because when require itself
    ["system_commission", "system_commission"],
  ]
);

const CreateGroupTrading: FC<IEditPublicFormProps> = ({
  group,
  setVisibility,
  isEdit,
  onSubmit,
  stockList,
  setCreateContest,
  createContest,
  setDraw,
  draw,
  setActionPerform,
}) => {
  const formikRef = useRef(null);
  const [check, setCheck] = useState(1);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [maxPlayerVal, setMaxPlayerVal] = useState<any>("");
  // const [winningLimit, setWinningLimit] = useState<any>("");
  const [maxRankLimit, setMaxRankLimit] = useState<any>("");
  const [isGuaranteed, setIsGuaranteed] = useState(0);
  const [isDisable, setIsDisable] = useState(false);

  const [winningLimit, setWinningLimit] = useState(null);
  const [maximumPlayer, setMaximumPlayer] = useState(null);
  const [randomeKey, setRandomKey] = useState("");
  const [minRankVal, setMinRankVal] = useState<any>(null);
  const [maxRankVal, setMaxRankVal] = useState<any>(null);

  const minPlayer: any = 1;
  const initialValues = {
    id: group?.id ? group.id : null,
    name: group?.name ? group.name : "",
    amount: group?.amount ? group.amount : "",
    round_limit: group?.round_limit ? group.round_limit : "",
    status: group?.status ? group.status : 1,
    winning_limit: group?.winning_limit ? group.winning_limit : "",
    winning_amount: group?.winning_amount ? group.winning_amount : "",
    system_commission: group?.system_commission ? group.system_commission : "",
    is_guaranteed_return: group?.is_guaranteed_return
      ? group.is_guaranteed_return
      : 0,
    minimum_player: group?.minimum_player ? group.minimum_player : 1,
    maximum_player: group?.maximum_player ? group.maximum_player : "",
    reward: [
      {
        min_rank: "",
        max_rank: "",
        amount: "",
      },
    ],
  };

  useEffect(() => {
    if (winningLimit && maximumPlayer) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [winningLimit, maximumPlayer]);

  useEffect(() => {
    if (group?.status !== undefined) {
      setCheck(group.status);
    }
  }, [group?.status]);

  useEffect(() => {
    if (group?.isGuaranteed !== undefined) {
      setCheck(group.isGuaranteed);
    }
  }, [group?.isGuaranteed]);

  const submit = async (values: any, setFieldError: any) => {
    // values?.reward && values.reward.map((value:any) =>(
    //   value.amount && setWinAmountVal(value.amount)
    // ));
    // values?.reward && values.reward.map((value:any) =>(
    //   value.amount && setWinAmountVal(value.amount)
    // ));
    //   if(values.is_guaranteed_return === 1){
    //  setMinPlayer("null");
    //   }
    //   if(values.is_guaranteed_return !==1){
    //     setMinPlayer(values.minimum_player);
    //      }
    // const {}=values

    values = {
      ...values,
      status: check,
      is_guaranteed_return: isGuaranteed,

      minimum_player:
        isGuaranteed && isGuaranteed === 1 ? 1 : values.minimum_player,
    };

    let response;
    setCreateContest(false);
    try {
      setActionPerform(true);
      setDraw(draw + 1);
      if (values.id) {
        response = await updateGroup(values);
      } else {
        response = await createGroup(values);
      }
      if (response.data.success) {
        setDraw(draw + 1);
        message.success(response.data.message);
        setVisibility(false);
        onSubmit();
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      }
      message.destroy();
    }
  };

  if (stockList?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-3">
        <Link
          to="/trading/group-trading"
          onClick={() => {
            setCreateContest(false);
          }}
        >
          <BsFillArrowLeftSquareFill size={35} style={{ color: "#0A3453" }} />
        </Link>
      </div>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={groupTradingModalSchema}
        onSubmit={(values, actions) => submit(values, actions.setFieldError)}
        onReset={(setFieldValue) => {
          setIsGuaranteed(0);
          setCheck(1);
          setWinningLimit(null);
          setMaxPlayerVal(null);
          setRandomKey(Math.random().toString(36));
        }}
      >
        {({ values, errors, setFieldValue, touched, setFieldTouched }) => (
          <Card title="Group Trading Create Contest" extra="">
            {setMaxRankLimit(
              (values.winning_limit * values.maximum_player) / 100
            )}
            {setMaxPlayerVal(values.maximum_player)}
            <Form>
              <Row>
                <Col xs={12} md={5} lg={6} className="pe-5">
                  <Row>
                    <Col className="mb-4">
                      <Typography className="fs-6 fw-normal ">
                        {" "}
                        Group Details{" "}
                      </Typography>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="name"
                        label="Group Name"
                        placeholder="Enter Group Name"
                        size="default"
                        component={InputField}
                      />
                      {/* {touched.name && errors.name && <p>{errors.name}</p>} */}
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="round_limit"
                        label="Rounds Limit"
                        type="number"
                        placeholder="Enter Rounds Limit"
                        size="default"
                        component={InputField}
                      />
                      {/* {touched.round_limit && errors.round_limit && <p>{errors.round_limit}</p>} */}
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="winning_limit"
                        label="Winning Limit (In Percentage)"
                        type="number"
                        placeholder="Enter Winning Limit"
                        size="default"
                        component={InputField}
                        isOnChange={true}
                        onChange={(e: any) => {
                          setWinningLimit(e.target.value);
                          setFieldValue("winning_limit", e.target.value);
                        }}
                        randomeKey={randomeKey}
                      />
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="amount"
                        label="Amount"
                        type="number"
                        placeholder="Enter Amount"
                        size="default"
                        component={InputField}
                      />
                      {/* {touched.amount && errors.amount && <p>{errors.amount}</p>} */}
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="winning_amount"
                        label="Winning Amount"
                        type="number"
                        placeholder="Enter Winning Amount"
                        size="default"
                        component={InputField}
                      />
                    </Col>
                    {/* <Col xs={12} md={6} lg={6}>
                      <Field
                        name="system_commission"
                        label="System Commission"
                        type="number"
                        placeholder="Enter System Commission"
                        size="default"
                        component={InputField}
                      />
                    </Col> */}
                    {/* <Row> */}
                  </Row>
                  <Row>
                    <Col xs={12} md={6} lg={6}>
                      <Field
                        name="is_guaranteed_return"
                        label="Enable Guaranteed Return"
                        size="default"
                        style={{
                          backgroundColor: isGuaranteed ? "#0A3453" : "#d9d7d7",
                        }}
                        defaultChecked={isGuaranteed}
                        onChange={(value: any) => {
                          setIsGuaranteed(value ? 1 : 0);

                          const minPlayerVal = value === true ? 1 : minPlayer;
                          if (value === true) {
                            setFieldValue("minimum_player", minPlayerVal);
                          }
                        }}
                        className="mt-2 d-block"
                        component={SwitchField}
                        randomeKey={randomeKey}
                      />
                      {/* {touched.is_guaranteed_return && errors.is_guaranteed_return && <p>{errors.is_guaranteed_return}</p>} */}
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      className={isGuaranteed ? "d-none" : ""}
                    >
                      <Field
                        key={isGuaranteed}
                        name="minimum_player"
                        label="Minimum Player"
                        type="number"
                        placeholder="Enter Minimum Player"
                        size="default"
                        component={InputField}
                        disabled={isGuaranteed || false}
                        defaultValue={minPlayer}
                        // value={minPlayer}
                      />
                      {touched.minimum_player &&
                        minPlayer === "" &&
                        isGuaranteed === 0 && (
                          <p className="text-danger Error-Text">
                            Please enter minimum players
                          </p>
                        )}
                    </Col>
                    {/* </Row> */}
                    <Row className="me-0 pe-0">
                      <Col xs={12} md={6} lg={6}>
                        <Field
                          name="status"
                          label="Status"
                          size="default"
                          style={{
                            backgroundColor: check ? "#0A3453" : "#d9d7d7",
                          }}
                          defaultChecked={check}
                          onChange={(values: any) =>
                            setCheck(values === true ? 1 : 0)
                          }
                          className="mt-1 d-block"
                          component={SwitchField}
                          randomeKey={randomeKey}
                        />
                        {/* {touched.status && errors.status && <p>{errors.status}</p>} */}
                      </Col>
                      <Col xs={12} md={6} lg={6} className="statusField">
                        <Field
                          name="maximum_player"
                          label="Maximum Player"
                          type="number"
                          placeholder="Enter Maximum Player"
                          size="default"
                          component={InputField}
                          isOnChange={true}
                          onChange={(e: any) => {
                            setMaximumPlayer(e.target.value);
                            setFieldValue("maximum_player", e.target.value);
                          }}
                          randomeKey={randomeKey}
                        />
                        {/* {touched.maximum_player && errors.maximum_player && <p>{errors.maximum_player}</p>} */}
                      </Col>
                    </Row>
                  </Row>
                </Col>
                {/* {isVisible && ( */}
                <Col xs={12} md={7} lg={6} className="rewardSection ps-5">
                  <Row>
                    <Col>
                      <Typography className="fs-6 fw-normal">
                        {" "}
                        Prize Distribution
                      </Typography>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <FieldArray name="reward">
                        {({ insert, remove, push }) => (
                          <div>
                            {values.reward.length > 0 &&
                              values.reward.map((reward, index) => (
                                <Row key={index}>
                                  <Col>
                                    <Row>
                                      <Col
                                        className={` ${
                                          index !== 0
                                            ? "d-none"
                                            : "secondary mt-4 fw-bold "
                                        }`}
                                      >
                                        Minimum Rank
                                      </Col>
                                      <Col
                                        className={` ${
                                          index !== 0
                                            ? "d-none"
                                            : "secondary mt-4 fw-bold "
                                        }`}
                                      >
                                        Maximum Rank
                                      </Col>
                                      <Col
                                        className={` ${
                                          index !== 0
                                            ? "d-none"
                                            : "secondary mt-4 fw-bold "
                                        }`}
                                      >
                                        Amount
                                      </Col>
                                      <Col
                                        className={` ${
                                          index !== 0
                                            ? "d-none"
                                            : "secondary mt-4 fw-bold "
                                        }`}
                                      >
                                        {" "}
                                      </Col>
                                    </Row>
                                    <Row
                                      className={`${
                                        index == 0 ? "mt-0" : "mt-4"
                                      }`}
                                    >
                                      <Col xs={12} md={6} lg={3}>
                                        <Field
                                          name={`reward.${index}.min_rank`}
                                          placeholder="Minimum Rank"
                                          type="number"
                                          component={InputField}
                                          disabled={!isDisable}
                                          className={`Form-Input ${
                                            (touched?.reward &&
                                              touched?.reward[index] &&
                                              touched?.reward[index]
                                                ?.min_rank &&
                                              // typeof touched.reward[index] !=
                                              // "undefined" ||
                                              errors.reward &&
                                              typeof errors.reward[index] !=
                                                "undefined" &&
                                              Object.prototype.hasOwnProperty.call(
                                                errors.reward[index],
                                                "min_rank"
                                              ) &&
                                              "Error") ||
                                            (maxRankLimit <
                                              values.reward[index].min_rank &&
                                              "Error")
                                          }`}
                                        />
                                        {setMinRankVal(values?.reward[index]?.min_rank)}
                                        {setMaxRankVal(values?.reward[index]?.max_rank)}
                                        {(values.reward[index].min_rank &&
                                          maxRankLimit <
                                            values.reward[index].min_rank && (
                                            <p className="text-danger Error-Text ">
                                              Ranks have exceeded the limit. Please check.
                                              {/* Minimum rank should be less then
                                              maximum rank-{maxRankLimit} */}
                                            </p>
                                          )) ||
                                          (values.reward[index].min_rank &&
                                            maxPlayerVal <
                                              values.reward[index].min_rank && (
                                              <p className="text-danger Error-Text ">
                                                Minimum rank should be less then
                                                maximum players
                                              </p>
                                            )) ||
                                          (values.reward[index].min_rank &&
                                          maxPlayerVal <
                                            values.reward[index].min_rank
                                            ? setSubmitBtn(true)
                                            : setSubmitBtn(false)) ||
                                          (values.reward[index].min_rank &&
                                          maxRankLimit <
                                            values.reward[index].min_rank
                                            ? setSubmitBtn(true)
                                            : setSubmitBtn(false)) || (
                                            <>
                                              <ErrorMessage
                                                name={`reward.${index}.min_rank`}
                                                component="div"
                                                className="field-error text-danger fw-normal"
                                              />
                                            </>
                                          )}
                                      </Col>
                                      <Col xs={12} md={6} lg={3}>
                                        <Field
                                          name={`reward.${index}.max_rank`}
                                          placeholder="Maximum Rank"
                                          type="number"
                                          component={InputField}
                                          disabled={!isDisable}
                                          className={`
                                          Form-Input ${
                                            (errors.reward &&
                                              typeof errors.reward[index] !=
                                                "undefined" &&
                                              Object.prototype.hasOwnProperty.call(
                                                errors.reward[index],
                                                "max_rank"
                                              ) &&
                                              "Error") ||
                                            (maxPlayerVal <
                                              values.reward[index].max_rank &&
                                              "Error") ||
                                            (maxRankLimit <
                                              values.reward[index].max_rank &&
                                              "Error")
                                          }`}
                                        />
                                        {(values.reward[index].max_rank &&
                                          maxRankLimit <
                                            values.reward[index].max_rank && (
                                            <p className="text-danger Error-Text">
                                              Ranks have exceeded the limit. Please check.
                                              {/* Maximum rank should be less or
                                              equal then maximum rank{" "}
                                              {maxRankLimit} */}
                                            </p>
                                          )) ||
                                          (values.reward[index].max_rank &&
                                            maxPlayerVal <
                                              values.reward[index].max_rank && (
                                              <p className="text-danger Error-Text">
                                                Maximum rank should be less or
                                                equal then maximum players
                                              </p>
                                            )) ||
                                          (maxPlayerVal <
                                          values.reward[index].max_rank
                                            ? setSubmitBtn(true)
                                            : setSubmitBtn(false)) ||
                                          (maxRankLimit <
                                          values.reward[index].max_rank
                                            ? setSubmitBtn(true)
                                            : setSubmitBtn(false)) || (
                                            <>
                                              <ErrorMessage
                                                name={`reward.${index}.max_rank`}
                                                component="div"
                                                className="field-error text-danger fw-normal"
                                              />
                                            </>
                                          )}
                                      </Col>
                                      <Col xs={12} md={6} lg={3}>
                                        <Field
                                          name={`reward.${index}.amount`}
                                          placeholder="Enter Amount"
                                          type="number"
                                          component={InputField}
                                          disabled={!isDisable}
                                          className={`Form-Input ${
                                            touched?.reward &&
                                            touched?.reward[index] &&
                                            touched?.reward[index]?.amount &&
                                            // typeof touched.reward[index].amount !=
                                            // "undefined" &&
                                            errors.reward &&
                                            typeof errors.reward[index] !=
                                              "undefined" &&
                                            Object.prototype.hasOwnProperty.call(
                                              errors.reward[index],
                                              "amount"
                                            ) &&
                                            "Error"
                                          }`}
                                          // className={`Form-Input ${((touched.reward && touched.reward[index].amount)
                                          //   && (values.reward && values.reward[index].amount == ""))  && "Error" }`}
                                        />
                                        <ErrorMessage
                                          name={`reward.${index}.amount`}
                                          component="div"
                                          className="field-error text-danger fw-normal"
                                        />
                                      </Col>
                                      <Col xs={12} md={6} lg={1}>
                                        <Button
                                          type="primary"
                                          className={` ${
                                            index == 0
                                              ? "d-none"
                                              : "secondary mt-1 fw-bold "
                                          }`}
                                          onClick={() => remove(index)}
                                        >
                                          X
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              ))}
                            <Button
                              type="primary"
                              className="secondary mt-3"
                              disabled={ maxRankLimit <= minRankVal || maxRankLimit <= maxRankVal}
                              onClick={() =>
                                push({
                                  min_rank: "",
                                  max_rank: "",
                                  amount: "",
                                })
                              }
                            >
                              Add Reward
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </Col>
                  </Row>
                </Col>
                {/* )} */}
              </Row>

              <Row className="d-flex  justify-content-md-end me-5 pe-23">
                {/* <Col className="d-flex  justify-content-md-end " >
                  <Button
                    type="primary"
                    className="mt-2"
                    // onClick={() => setIsVisible(!isVisible)}
                  >
                    Next
                  </Button>
                </Col> */}
                {/* {isVisible && ( */}
                <Col className="d-flex justify-content-end">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <SubmitButton disabled={submitBtn}>
                    {isEdit ? "Update" : "Create"}
                  </SubmitButton>
                </Col>
                {/* )} */}
              </Row>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};
export default CreateGroupTrading;
