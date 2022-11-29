import { Select } from "antd";
const { Option } = Select;

function SelectField({
  field,
  form: { touched, errors },
  meta,
  ...props
}: any) {
  
  return (
    <div>
      <label style={{ fontWeight: 400 }}>{props.label}</label>
      <Select
        // defaultValue={optionVal}
        showArrow
        mode={props.mode}
        showSearch
        className={`Form-Input ${
          touched[field.name] && errors[field.name] && "Error"
        }`}
        style={{
          width: "100%",
        }}
        placeholder={props.placeholder}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onBlur={props.onBlur}
        key={props.randomeKey || ""}
      >
        {/* <Option key={`0`} value={null}>{props.placeholder}</Option> */}
        {props.options &&
          props.options.length > 0 &&
          props.options.map((option: any, i: any) =>
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          )}
      </Select>
      {touched[field.name] && errors[field.name] && (
        <p className="text-danger Error-Text">{errors[field.name]}</p>
      )}
      {errors && errors?.select ? (
        <p className="text-danger Error-Text">{errors?.select}</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default SelectField;
