import { TimePicker } from "antd";

const TimePickerField = ({
  field,
  form: { touched, errors },
  meta,
  ...props
}: any) => {
  return (
    <div className="mt-1 mb-2">
      <label>{props.label}</label>
      <TimePicker
        className={`Form-Input ${
          touched[field.name] && errors[field.name] && "Error"
        }`}
        format={"HH:mm"}
        {...props}
        {...field}
      />
      {touched[field.name] && errors[field.name] && (
        <p className="text-danger Error-Text">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default TimePickerField;
