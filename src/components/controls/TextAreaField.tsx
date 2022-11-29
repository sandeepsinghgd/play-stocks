import { Input } from "antd";

const { TextArea } = Input;

const TextAreaField = ({
    field,
    form: { touched, errors },
    meta,
    ...props
}:any) => {
  return (
    <div className='mt-1'>
    <label>{props.label}</label>
    <TextArea
        className={`Form-Input ${touched[field.name] && errors[field.name] && "Error"}`}
        defaultValue={props.defaultValue}
        {...props}
        {...field}
        // onChange={props.onChange}
    />
    {touched[field.name] && errors[field.name] && (
        <p className='text-danger Error-Text'>{errors[field.name]}</p>
    )}
</div>
  );
};

export default TextAreaField;