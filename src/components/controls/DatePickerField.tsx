import { DatePicker } from "antd";
  
const DatePickerField = ({
    field,
    form: { touched, errors },
    meta,
    ...props
}:any) => {
    return (
        <div className='mt-1 mb-2'>
            <label>{props.label}</label>
            <DatePicker className={`Form-Input ${touched[field.name] && errors[field.name] && "Error"}`}
                {...props}
                {...field}
                 />
            {touched[field.name] && errors[field.name] && (
                <p className='text-danger Error-Text'>{errors[field.name]}</p>
            )}
        </div>
    );
};

export default DatePickerField;
