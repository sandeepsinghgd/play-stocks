import { Select } from "antd";

const Option = Select.Option;

function SelectComp(props: any) {  
  return (
    <div>
      <Select
        showArrow
        className="Form-Input"
        style={{ width: 130 }}
        placeholder={props.placeholder}
        optionFilterProp="children"
        onChange={props.handleChange}
        allowClear={true}
        value={props.value}
        onDeselect={props.onClear}
      >
        {props?.options && props?.options.map((option:any, index:any)=>{
          return <Option value={option?.id} key={option.id}>{option?.name}</Option>
        })}
      </Select>
    </div>
  );
}

export default SelectComp;
