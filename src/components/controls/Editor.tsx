import React from "react";
import ReactQuill, { Quill } from "react-quill";
import htmlEditButton from "quill-html-edit-button";
import "react-quill/dist/quill.snow.css";
import "../../styles/editor.scss";

const Editor = ({
  field,
    meta,
  label,
  setTextEditorValue,
  textEditorValue,
  setFieldValue,
  errors,
  setFieldTouched,
  touched,
  onChange
}: any) => {
  // const r2 = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  Quill.register({
    // 'modules/toolbar': Toolbar,
    // 'themes/snow': Snow,
    "modules/htmlEditButton": htmlEditButton,
  });
  return (
    <div className="mt-1">
      <label style={{fontWeight:400}}>{label}</label>
      <ReactQuill
        className="shadow-sm"
        theme="snow"
        style={{
          height: 350,
          marginTop: "2px",
          border:
          touched[field.name] && errors[field.name]
              ? "1px solid red"
              : "",
          display: "flex",
          flexDirection: "column",
        }}
        value={textEditorValue}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "video", "image", "code-block"],
            ["clean"],
          ],
          htmlEditButton: {
            debug: true,
            syntax: true,
            buttonHTML: "<strong class='mb-3'>HTML</strong>",
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "color",
          "background",
          "list",
          "bullet",
          "indent",
          "link",
          "video",
          "image",
          "code-block",
          "align",
        ]}
        onChange={onChange}
        // onChange={(val) => {
        //   setTextEditorValue(val);
        //   setFieldValue("page_content", val.replace(r2, ""));
        // }}
        onBlur={() => {
          setFieldTouched(field.name);
          // if (textEditorValue.replace(r2, "")) {
          // } else {
          // }
        }}
      />
      {/* {error && <p className="text-danger Error-Text">Message is Required</p>} */}
      {/* {errors && errors?.page_content && touched && touched?.page_content ? (
        <p className="text-danger Error-Text"> {errors?.page_content} </p>
      ) : ("")} */}
      {touched[field.name] && errors[field.name] && (
                <p className='text-danger Error-Text'>{errors[field.name]}</p>
            )}
    </div>
  );
};

export default Editor;
