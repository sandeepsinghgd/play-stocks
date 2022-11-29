import React from "react";
import { Input } from "antd";

const PasswordField = ({
    field,
    form: { touched, errors },
    meta,
    ...props
}:any) => {
    return (
        <div className='mt-1 mb-1'>
            <label>{props.label}</label>
            <Input.Password
                className={`Form-Input ${touched[field.name] && errors[field.name] && "Error"}`}
                {...props}
                {...field}
            />
            {touched[field.name] && errors[field.name] && (
                <p className='text-danger Error-Text'>{errors[field.name]}</p>
            )}
        </div>
    );
};

export default PasswordField;
            