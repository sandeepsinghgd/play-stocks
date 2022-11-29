import {
  Card,
  Col,
  message,
  Row,
} from "antd";
import { Field, Form, Formik } from "formik";
// import { SubmitButton } from "formik-antd";
import { useEffect, useState } from "react";
import InputField from "../../components/controls/InputField";
import SwitchField from "../../components/controls/SwitchField";
import * as Yup from "yup";
import { createCmsList, updateCmsData } from "../../api/cms";
import SelectField from "../../components/controls/SelectField";
import Editor from "../../components/controls/Editor";
import "../../styles/cardComp.scss";

// const enlishRegex = /^[A-Za-z0-9\s]+$/;
// const hindiRegex =    /^[\u0900-\u097F0-9\s.]+$/;

const cmsValidation = Yup.object().shape({  
  title: Yup
    .string()
    // .matches(enlishRegex, "Only english letters and numbers")
    .required("Title is Required."),
  title_hindi: Yup
    .string()
    // .matches(hindiRegex, "Only hindi letters and numbers")
    .required("Hindi Title is Required."),
  slug: Yup
    .string()
    .required("Slug is required."),
  page_content: Yup
    .string()
    // .matches(enlishRegex, "Only english letters and numbers")
    .required("Page content is Required."),
  page_content_hindi: Yup
    .string()
    // .matches(hindiRegex, "Only hindi letters and numbers")
    .required("Page content in hindi is Required."),
  display_type: Yup.string().required("Display Type is required"),
});

const CardComp = ({
  setTemplate,
  template,
  editId,
  isEdit,
  user,
  setEditId,
  draw,
  setDraw,
}: any) => {
  const [textEditorValue, setTextEditorValue] = useState<any>(
    user?.page_content ? user.page_content : ""
  );
  const [hindiTextEditorValue, setHinditextEditorvalue] = useState<any>(user?.page_content_hindi ? user.page_content_hindi : "");
  const [check, setCheck] = useState(1);
  const [displaytype, setDisplayType] = useState<any>();
  const [randomeKey, setRandomKey] = useState("");

  const r2 = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  useEffect(() => {
    if (user.status !== undefined) {
      setCheck(user.status);
    }
    if (user?.display_type !== undefined) {
      setDisplayType(user?.display_type)
    }
  }, [user?.status, user?.display_type]);

  const initialValues = {
    title: user?.title ? user.title : "",
    slug: user?.slug ? user?.slug : "",
    status: user?.status ? user?.status : 1,
    display_type: user?.display_type ? user?.display_type : displaytype,
    page_content: user?.page_content ? user?.page_content : "",
    title_hindi:user?.title_hindi ? user?.title_hindi : "",
    page_content_hindi: user?.page_content_hindi ? user?.page_content_hindi : "",

  };

  const onSubmit = async (values: any, setFieldError: any, resetForm: any) => {
    const displayTypeVal = displaytype.toString();
    try {
      let response;
      values = {
        ...values,
        status: check,
        page_content: textEditorValue,
        page_content_hindi: hindiTextEditorValue,
        display_type: displayTypeVal,
      };
      if (editId) {
        // message.loading(`Updating ${entity}...`, 0);
        response = await updateCmsData(user.id, values);
        if (response.data.success) {
          resetForm({ values: "" });
          setTextEditorValue("");
          setHinditextEditorvalue("");
          setEditId("");
          setDraw(draw + 1);
          setDraw(0);
          setTemplate(!template);
          message.destroy();
          message.success(response.data.message);
        }
      } else {
        response = await createCmsList(values);
        if (response.data.success) {
          resetForm({ values: "" });
          setTextEditorValue("");
          setHinditextEditorvalue("");
          setDraw(draw + 1);
          setDraw(0);
          setTemplate(!template);
          message.destroy();
          message.success(response.data.message);
        }
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

  const options= [
    {
      id: 1,
      name: "None"
    },
    {
      id: 2,
      name: "Footer"
    },    
  ];

  if(displaytype === undefined && isEdit) {
    return null
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Card
            className="w-100 cmsCardComp"
            size="small"
            title="New Template"
          >
            <Row>
              <Col span={24}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={cmsValidation}
                  onReset={(setFieldValue) => {
                    setCheck(1)
                    setRandomKey(Math.random().toString(36));
                  }}
                  onSubmit={(values, actions) =>
                    onSubmit(values, actions.setFieldError, actions.resetForm)
                  }
                  render={({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting,
                    handleBlur,
                    setFieldTouched,
                  }) => (
                    <Form>
                      <Row>
                        <Col xs={24} sm={24} lg={24} className="pe-md-2">
                          <Field
                            name="title"
                            label="Title"
                            placeholder="Enter Title"
                            size="large"
                            component={InputField}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24} sm={24} lg={24} className="pe-md-2">
                          <Field
                            name="title_hindi"
                            label="Title (In Hindi)"
                            placeholder="Enter Title in Hindi"
                            size="large"
                            component={InputField}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24} sm={24} lg={24} className="pe-md-2 mt-3">
                          <Field
                            name="slug"
                            label="Slug"
                            placeholder="Enter Slug"
                            size="large"
                            autoComplete="off"
                            component={InputField}
                          />
                        </Col>
                      </Row>
                      <Row>
                      <Col xs={8} md={8} lg={8} className="mt-3 ">
                          <Field 
                          name="display_type"
                          label="Display Type"
                          size="default"
                          placeholder="Display Type"
                          options={options}
                          defaultValue={displaytype}
                          component={SelectField}
                          onChange={(val: any, option: any) => {
                            setDisplayType(val);
                            setFieldValue("display_type", val);
                          }}
                          onBlur={() => {
                            setFieldTouched("display_type");
                          }}
                          />
                        </Col>
                        <Col xs={4} md={4} lg={4} className="mt-3 ms-5">
                          <Field
                            name="status"
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
                      <Row className="mt-2 mb-0">
                        <Col xs={24} sm={24} lg={24} className="pe-md-0">
                          <Field
                            name="page_content"
                            label="Page Content"
                            textEditorValue={textEditorValue}
                            setFieldTouched={setFieldTouched}
                            errors={errors}
                            touched={touched}
                            component={Editor}
                            onChange={(val:any) => {
                              setTextEditorValue(val);
                              setFieldValue("page_content", val.replace(r2, ""));
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2 mb-0">
                        <Col xs={24} sm={24} lg={24} className="pe-md-0">
                          <Field
                            name="page_content_hindi"
                            label="Page Content (In Hindi)"
                            setTextEditorValue={setTextEditorValue}
                            textEditorValue={hindiTextEditorValue}
                            setFieldTouched={setFieldTouched}
                            errors={errors}
                            touched={touched}
                            component={Editor}
                            onChange={(val:any) => {
                              setHinditextEditorvalue(val);
                              setFieldValue("page_content_hindi", val.replace(r2, ""));
                            }}
                          />
                        </Col>
                      </Row>
                      {/* {errors.message && touched.message ? (
                        <p className="text-danger Error-Text">
                          {errors.message}
                        </p>
                      ) : null} */}

                      <Row gutter={4} className="d-flex justify-content-end">
                        <Col>
                          {/* <SubmitButton className="mt-3 ps-5 pe-5">
                            {editId ? "Update" : "Create"}
                          </SubmitButton> */}
                           <button type="submit" className="p-1 mt-2 submitBtn" >
                          {editId ? "Update" : "Create"}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                ></Formik>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CardComp;
