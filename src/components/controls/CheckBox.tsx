import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";

const onChange = (e: CheckboxChangeEvent) => {
};

const CheckBoxField = (props: any) => {
  return(
    <>
   <Checkbox onChange={onChange} {...props}/> <label style={{fontWeight:"400"}}>{props?.label}</label>
    
    </>
  );
}

export default CheckBoxField;
