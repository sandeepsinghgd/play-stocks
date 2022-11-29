import { DatePicker, Space } from "antd";
import moment from "moment";

const DatePickerComp = (props: any) => {
  const onChange = (value: any) => {
    if (value) {
      props.setDate(moment(value).format("YYYY-MM-DD"));
    } else if (value === null) {
      props.setDate(value);
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker onChange={onChange}  />
    </Space>
  );
};
export default DatePickerComp;
