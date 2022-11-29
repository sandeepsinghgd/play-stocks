import React from "react";
import { Input } from "antd";
  
const InputField = ({
    field,
    form: { touched, errors },
    meta,
    ...props
}:any) => {
    const { onChange } = props
    return (
        <div className='mt-1'>
            <label style={{fontWeight:"400"}}>{props.label}</label>
            <Input
                className={`Form-Input ${touched[field.name] && errors[field.name] && "Error"}`}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                {...field}
                {...(!props.isOnChange && {...props})}
                // {...(!props.isOnChange && {...field})}
                {...(props.isOnChange && {onChange: onChange})}
                key={props.randomeKey || ""}
            />
            {touched[field.name] && errors[field.name] && (
                <p className='text-danger Error-Text'>{errors[field.name]}</p>
            )}
        </div>
    );
};

export default InputField;
