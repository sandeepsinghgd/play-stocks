import { Card, Col, DatePicker, Row } from "antd";
import { Form, Formik } from "formik";
import { SubmitButton } from "formik-antd";
import moment from "moment";
import { FC, useRef } from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import "../../styles/reportForm.scss";

const ReportFormSchema = Yup.object().shape({
  startDate: Yup.date().required("Please Enter Start Date"),
  endDate: Yup.date()
    .required("Please Enter End Date")
    .min(Yup.ref("startDate"), "End date has to be more than start date"),
});

const ReportDateSchema = Yup.object().shape({
  date: Yup.date().required("Please Enter Start Date"),
});

export interface DataTableProps {
  onSubmit?: any;
  title?: any;
  dateFilter?: any;
  resetFormHandler?: any;
  setSingleDate?: any;
  setStartDate?: any;
  setEndDate?: any;
  startDate?:any;
  endDate?:any;
}

const ReportForm: FC<DataTableProps> = ({
  onSubmit,
  title,
  dateFilter,
  resetFormHandler,
  setSingleDate,
  setStartDate,
  setEndDate,
  startDate,
  endDate
}: any) => {
  const dateFormat = "YYYY-MM-DD";
  const formikRef = useRef(null);
  const defaultEndDate = moment().format("YYYY-MM-DD");
  // const defaultStartDate = moment().subtract(1, "day").format("YYYY-MM-DD");

  const defaultValues = {
    startDate: defaultEndDate,
    endDate: defaultEndDate,
    date: defaultEndDate,
  };

  const { control, reset,setError } = useForm({
    defaultValues,
  });


  return (
    <Card size="small" className="mb-5">
      {dateFilter ? (
        <Formik
          innerRef={formikRef}
          initialValues={defaultValues}
          validationSchema={ReportFormSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            setFieldValue,
            touched,
            setFieldTouched,
            handleReset,
            // setFieldError,
          }) => (
            <Form>
              <Row className="pb-2 editTitle">
                <Col xs={12} md={6} lg={6}>
                  <h6 className="pt-2 reportFormTitle">{title}</h6>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="d-flex justify-content-md-end"
                ></Col>
              </Row>
              <>
                <Row className="mt-3">
                  <Col className=" d-block mt-1 heading">
                    Select Date Range:
                  </Col>
                </Row>
                <Row className="mt-2 gy-5">
                  <Col xs={12} md={12} lg={3} xl={4} className="me-3 mt-2">
                    <Controller
                      control={control}
                      name={"startDate"}
                      render={({ field }) => {
                        return (
                          <DatePicker
                            value={
                              field.value
                                ? moment(field.value, dateFormat)
                                : undefined
                            }
                            onChange={(value, dateString) => {
                              field.onChange(value);
                              setFieldValue("startDate", dateString);
                            }}
                            name="startDate"
                            format={dateFormat}
                            className={`${
                              touched.startDate && errors.startDate && "Error"
                            } d-block`}
                            placeholder={"Select Start Date"}
                            disabledDate={(current) =>
                              current.isAfter(moment().add(0, "day"))
                            }
                            allowClear={false}
                          />
                        );
                      }}
                    />
                    {touched.startDate && errors.startDate && (
                      <p className="text-danger Error-Text">
                        {errors.startDate}
                      </p>
                    )}
                  </Col>
                  <Col xs={12} md={12} lg={3} xl={4} className="me-3 mt-2">
                    <Controller
                      control={control}
                      name={"endDate"}
                      render={({ field }) => {
                        return (
                          <DatePicker
                            value={
                              field.value
                                ? moment(field.value, dateFormat)
                                : undefined
                            }
                            onChange={(value, dateString) => {
                              field.onChange(value);
                              setFieldValue("endDate", dateString);
                            }}
                            name="endDate"
                            format={dateFormat}
                            className={`${
                              touched.endDate && errors.endDate && "Error"
                            } d-block`}
                            placeholder={"Select End Date"}
                            disabledDate={(current) =>
                              current.isAfter(moment().add(0, "day"))
                            }
                            allowClear={false}
                          />
                        );
                      }}
                    />
                    {touched.endDate && errors.endDate && (
                      <p className="text-danger Error-Text">{errors.endDate}</p>
                    )}
                    {/* <ErrorMessage name="endDate" />                */}
                  </Col>
                  <Col xs={12} md={1} lg={1} xl={1} className="mt-2 d-flex">
                    <button
                      type={"button"}
                      className="me-2 resetBtn"
                      onClick={() => {
                        setStartDate(defaultEndDate);
                        setEndDate(defaultEndDate);
                        setFieldValue("startDate", defaultEndDate);
                        setFieldValue("endDate", defaultEndDate);
                        setError("startDate", { type: "focus" }, { shouldFocus: true });
                        reset({
                          ...defaultValues,
                          startDate: defaultEndDate,
                          endDate: defaultEndDate,
                        });
                        resetFormHandler()
                      }}
                    >
                      Reset
                    </button>
                    <SubmitButton className="mt-0 submitBtn">
                      Submit
                    </SubmitButton>
                  </Col>
                </Row>
              </>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          innerRef={formikRef}
          initialValues={defaultValues}
          validationSchema={ReportDateSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            setFieldValue,
            touched,
            setFieldTouched,
            handleReset,
            setErrors,
          }) => (
            <Form>
              <Row className="pb-2 editTitle">
                <Col xs={12} md={6} lg={6}>
                  <h6 className="pt-2 reportFormTitle">{title}</h6>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="d-flex justify-content-md-end"
                ></Col>
              </Row>
              <>
                <Row className="mt-3">
                  <Col className=" d-block mt-1 heading">Select Date:</Col>
                </Row>
                <Row className="mt-2 gy-5">
                  <Col xs={12} md={12} lg={3} xl={4} className="me-3 mt-2">
                    <Controller
                      control={control}
                      name={"date"}
                      render={({ field }) => {
                        return (
                          <DatePicker
                            value={
                              field.value
                                ? moment(field.value, dateFormat)
                                : undefined
                            }
                            onChange={(value, dateString) => {
                              field.onChange(value);
                              setFieldValue("date", dateString);
                            }}
                            name="date"
                            format={dateFormat}
                            className={`${
                              touched.date && errors.date && "Error"
                            } d-block`}
                            placeholder={"Select Start Date"}
                            disabledDate={(current) =>
                              current.isAfter(moment().add(0, "day"))
                            }
                            allowClear={false}
                          />
                        );
                      }}
                    />
                    {touched.date && (
                      <p className="text-danger Error-Text">{errors.date}</p>
                    )}
                  </Col>
                  <Col xs={12} md={1} lg={1} xl={1} className="mt-2 d-flex">
                    <button
                      type={"button"}
                      className="me-2 resetBtn"
                      onClick={() => {
                        setSingleDate(defaultEndDate);
                        setFieldValue("date", defaultEndDate);
                        reset({
                          ...defaultValues,
                        });
                        resetFormHandler();
                        setErrors({});
                      }}
                    >
                      Reset
                    </button>
                    <SubmitButton className="mt-0 submitBtn">
                      Submit
                    </SubmitButton>
                  </Col>
                </Row>
              </>
            </Form>
          )}
        </Formik>
      )}
    </Card>
  );
};

export default ReportForm;
