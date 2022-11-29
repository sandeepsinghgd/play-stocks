import {
  DatePicker,
  Modal,
  Typography,
  // Checkbox,
  // TimePicker,
  message,
  Button,
  // Space,
} from "antd";
import { Field, Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { bidStatus, createEvent, editEvent } from "../../api/calendar";
import { addEvents, updateEvent } from "../../redux/actions/eventData";
import InputField from "../controls/InputField";
import "../../styles/_calendar.scss";

const { Title } = Typography;

const calendarModalSchema = Yup.object().shape({
  eventName: Yup.string().required("Please enter Event Name."),
  eventDate: Yup.string().required("Date is required"),
  // checkBox: Yup.boolean(),
  // startTime: Yup.string().when("checkBox", {
  //   is: true,
  //   then: Yup.string().required("Start time is required"),
  // }),
  // endTime: Yup.string().when("checkBox", {
  //   is: true,
  //   then: Yup.string().required("End time is required"),
  // }),
});

const CalendarModal = ({
  cellModalVisible,
  setCellModalVisible,
  defaultDate,
  title,
  checkAddBtn,
  setCheckAddBtn,
  clickEditIcon,
  setClickEditIcon,
  editId,
  setEditId,
  filteredEvents,
}: any) => {
  const [check, setCheck] = useState(false);
  const [clickSubmitBtn, setClickSubmitBtn] = useState(false);
  const [bidResponse, setBidResponse] = useState<any>(0);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [checkBtnOnChange, setCheckBtnOnChange] = useState(false);

  // const dispatch = useDispatch();
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const entity = "Customer";
  const dateFormat = "YYYY-MM-DD";

  const initialValues = {
    // checkBox: filteredEvents?.is_half_day ? filteredEvents.is_half_day : "",
    eventDate: defaultDate || "",
    eventName: filteredEvents?.event_name ? filteredEvents.event_name : "",
    // startTime: filteredEvents?.opening_time ? filteredEvents.opening_time : "",
    // endTime: filteredEvents?.closing_time ? filteredEvents.closing_time : "",
  };
  async function status() {
    const res: any = await bidStatus();
    // setBid(res)
    const response = res.data.result.total_bid;
    setBidResponse(response);
    // if(response>0){
    //   setBid(true)
    // } else{
    //   setBid(false)
    // }
    return res;
  }
  useEffect(() => {
    status();
  }, []);

  useEffect(() => {
    if (check !== undefined) {
      setCheck(check);
    }
  }, [check]);

  useEffect(() => {
    if (filteredEvents !== undefined) {
      if (filteredEvents.is_half_day) {
        setCheck(true);
      }
    }
  }, [filteredEvents]);

  const onSubmit = async (values: any, setFieldError: any) => {
    setClickSubmitBtn(false);
    setClickEditIcon(false);
    // setSubmitVal(values)

    try {
      // let response;
      const { eventName, eventDate } = values;
      values = {
        event_name: eventName,
        event_date: checkBtnOnChange
          ? eventDate
          : checkAddBtn && clickEditIcon
          ? eventDate.format("YYYY-MM-DD")
          : moment().add(1, "day").format("YYYY-MM-DD"),
        // is_half_day: checkBox ? 1 : 0,
        // opening_time: check ? startTime : null,
        // closing_time: check ? endTime : null,
      };
      // if (editId || checkBtnOnChange ) {
      if (editId && !checkBtnOnChange) {
        message.loading(`Updating ${entity}...`, 0);
        const response = await editEvent(filteredEvents.id, values);
        if (response.data.success) {
          dispatch(updateEvent(response.data.result));
          message.destroy();
          message.success(response.data.message);
          setCellModalVisible(false);
        }
      } else {
        const response = await createEvent(values);
        if (response.data.success) {
          dispatch(addEvents(response.data.result));
          message.destroy();
          message.success(response.data.message);
          setCellModalVisible(false);
        }
      }
    } catch (error: any) {
      // message.destroy();
      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      } else if (error.response.status === 400) {
        message.destroy();
        message.error(error.response.data.message);
        setCellModalVisible(false);
      }
      // message.destroy();
    }
  };

  const afterCloseFun = () => {
    setCheckBtnOnChange(false);
    // setCheck(false);
    // setFilteredEvents({});
    setEditId("");
    // setCheckAddBtn(false);
    // setEventDeleteId(null);
  };

  const MessageComp = ({ bidResponse }: any) => {
    // setBid(res)
    return (
      <>
        {bidResponse > 0 ? (
          <p className="mb-0 fs-6 pb-0 ">
            We have found Risks created for this date. If you continue with
            adding event, the Result date will be considered as next market open
            date. Warning: This event once added, will not be deleted. Do you
            want to continue?
          </p>
        ) : (
          <p className="mb-0 fs-6 pb-0 ">
            Do you want to {editId && !checkBtnOnChange ? "edit" : "add"} an
            event?
          </p>
        )}
      </>
    );
  };

  const ModalTitle = ({ bidResponse }: any) => {
    return (
      <>
        {bidResponse > 0 ? (
          <p className="mb-0 fs-6 pb-0 ">Risks Found</p>
        ) : (
          <p className="mb-0 fs-6 pb-0 ">
            {editId && !checkBtnOnChange ? "Edit" : "Add"} Event
          </p>
        )}
      </>
    );
  };

  const closeModal = () => {
    setCellModalVisible(false);
    setClickSubmitBtn(false);
  };
  return (
    <Modal
      title={
        <Title
          level={4}
          className="mb-0"
          style={{ display: "flex", alignItems: "center" }}
        >
          {clickSubmitBtn ? <ModalTitle bidResponse={bidResponse} /> : title}
          {/* {title} */}
        </Title>
      }
      visible={cellModalVisible}
      onCancel={() => {
        setCellModalVisible(false);
        setCheckAddBtn(false);
        setClickEditIcon(false);
        setClickSubmitBtn(false);
      }}
      footer={null}
      destroyOnClose={true}
      afterClose={() => afterCloseFun()}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={calendarModalSchema}
        onSubmit={(values, actions) => {
          // if(count==1){
          //   count++

          if (checkSubmit) {
            onSubmit(values, actions.setFieldError);
          } else {
            setClickSubmitBtn(true);
            actions.setSubmitting(false);
            setCheckSubmit(true);
          }
          // {checkSubmit==false? "" :actions.setSubmitting(true); ;}
          // }
        }}
        render={({ errors, touched, setFieldValue, values }) => (
          <Form layout="vertical" colon={false}>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <Row>
                  {clickSubmitBtn ? (
                    <MessageComp bidResponse={bidResponse} />
                  ) : (
                    <>
                      <Col lg={6} md={6}>
                        <label className="d-block mt-1">Select Date</label>
                        {/* {checkAddBtn ? (
                      <DatePicker
                        name="eventDate"
                        defaultValue={moment().add(1, "days")}
                        format={dateFormat}
                        className={`${
                          touched.eventDate && errors.eventDate && "Error"
                        } d-block`}
                        onChange={(date: any, dateString: any) => {
                          setFieldValue("eventDate", dateString);
                          setClickEditIcon(true)
                        }}
                        disabledDate={(current) => current.isBefore(moment().add(0,"day"))}
                      />
                    ) : (
                      <DatePicker
                        name="eventDate"
                        defaultValue={defaultDate}
                        format={dateFormat}
                        disabled
                        className={`${
                          touched.eventDate && errors.eventDate && "Error"
                        } d-block`}
                        onChange={(date: any, dateString: any) => {
                          setFieldValue("eventDate", dateString);

                        }}
                        disabledDate={(current) => current.isBefore(moment().add(0,"day"))}
                      />
                    )} */}
                        {clickEditIcon ? (
                          <>
                            <DatePicker
                              name="eventDate"
                              defaultValue={defaultDate}
                              format={dateFormat}
                              disabled
                              className={`${
                                touched.eventDate && errors.eventDate && "Error"
                              } d-block`}
                              onChange={(date: any, dateString: any) => {
                                setFieldValue("eventDate", dateString);
                                setClickEditIcon(true);
                              }}
                              disabledDate={(current) =>
                                current.isBefore(moment().add(0, "day"))
                              }
                            />
                          </>
                        ) : (
                          <>
                            <DatePicker
                              name="eventDate"
                              defaultValue={moment().add(1, "days")}
                              format={dateFormat}
                              className={`${
                                touched.eventDate && errors.eventDate && "Error"
                              } d-block`}
                              onChange={(date: any, dateString: any) => {
                                setFieldValue("eventDate", dateString);
                                // setClickEditIcon(true)
                                setCheckBtnOnChange(true);
                              }}
                              disabledDate={(current) =>
                                current.isBefore(moment().add(0, "day"))
                              }
                            />
                          </>
                        )}
                        <>
                          {errors.eventDate && touched.eventDate ? (
                            <p className="text-danger Error-Text">
                              {errors.eventDate}
                            </p>
                          ) : null}
                        </>
                      </Col>
                      <Col lg={6} md={6}>
                        <Field
                          name="eventName"
                          label="Event Name"
                          placeholder="Enter Event Name"
                          size="default"
                          autoComplete="off"
                          component={InputField}
                        />
                      </Col>
                    </>
                  )}
                </Row>
                {/* <span className="d-flex mt-2">
                  <label className="me-2">is half-day?</label>
                  <Checkbox
                    name="checkBox"
                    onChange={(e: any) => {
                      setCheck(e.target.checked);
                      setFieldValue("checkBox", e.target.checked);
                    }}
                    checked={check}
                    className="d-flex flex-column"
                    value={check}
                  />
                </span> */}
                {/* {check ? (
                  <Space direction="horizontal">
                    <Col>
                      <label className="me-2">Start Time</label>
                      {editId ? (
                        <TimePicker
                          className={`${
                            touched.startTime && errors.startTime && "Error"
                          } d-block`}
                          name="startTime"
                          onChange={(time: any, timeString: any) => {
                            setFieldValue("startTime", timeString);
                          }}
                          defaultValue={moment(
                            filteredEvents?.opening_time,
                            "HH:mm:ss"
                          )}
                        />
                      ) : (
                        <TimePicker
                          className={`${
                            touched.startTime && errors.startTime && "Error"
                          } d-block`}
                          name="startTime"
                          onChange={(time: any, timeString: any) => {
                            setFieldValue("startTime", timeString);
                          }}
                        />
                      )}
                      {errors.startTime && touched.startTime ? (
                        <p className="text-danger Error-Text">
                          {errors.startTime}
                        </p>
                      ) : null}
                    </Col>
                    <Col>
                      <label className="me-2">End Time</label>
                      {editId ? (
                        <TimePicker
                          className={`${
                            touched.endTime && errors.endTime && "Error"
                          } d-block`}
                          name="endTime"
                          onChange={(time: any, timeString: any) => {
                            setFieldValue("endTime", timeString);
                          }}
                          defaultValue={moment(
                            filteredEvents?.closing_time,
                            "HH:mm:ss"
                          )}
                        />
                      ) : (
                        <TimePicker
                          className={`${
                            touched.endTime && errors.endTime && "Error"
                          } d-block`}
                          name="endTime"
                          onChange={(time: any, timeString: any) => {
                            setFieldValue("endTime", timeString);
                          }}
                        />
                      )}
                      {errors.endTime && touched.endTime ? (
                        <p className="text-danger Error-Text">
                          {errors.endTime}
                        </p>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Space>
                ) : null} */}
              </Col>
            </Row>
            <Row className="justify-content-md-end mt-3">
              {clickSubmitBtn ? (
                <Col xs lg="4" className="d-flex justify-content-md-end">
                  <Button type="primary" className="me-2" onClick={closeModal}>
                    No{" "}
                  </Button>
                  <SubmitButton onClick={() => setCheckSubmit(true)}>
                    Yes
                  </SubmitButton>
                </Col>
              ) : (
                <Col xs lg="4" className="d-flex justify-content-md-end">
                  <ResetButton className="me-2">Reset</ResetButton>
                  <SubmitButton onClick={() => setCheckSubmit(false)}>
                    {editId ? "Update" : "Submit"}
                  </SubmitButton>
                </Col>
              )}
            </Row>
          </Form>
        )}
      ></Formik>
    </Modal>
  );
};

export default CalendarModal;
