import { Upload, Button } from "antd";

const FileUploader = ({
  field,
  form: { touched, errors },
  meta,
  ...props
}: any) => {
  return (
    <div className="mt-1 mb-2">
      <label>{props.label}</label>
      <Upload
        className={`Form-Input uploadBtnStyle ${props.btnDisplay} ${
          touched[field.name] && errors[field.name] && "Error"
        }`}
        onBlur={props.onBlur}
        {...props}
        {...field}
        key={props.randomeKey || ""}
      >
        <Button style={{ width: "100%" }} icon={props.btnIcon}>
          {props.btnName}
        </Button>
      </Upload>
      {touched[field.name] && errors[field.name] && (
        <p className="text-danger Error-Text">{errors[field.name]}</p>
      )}
    </div>
  );
};
export default FileUploader;
