import { Switch } from "antd";

function SwitchField({
  field,
  form: { touched, errors },
  meta,
  ...props
}:any) {
  return <>
      <label style={{fontWeight:400}}>{props.label}</label>
      <Switch {...props} key={props.randomeKey || ""} />
  </>;
}

export default SwitchField;
