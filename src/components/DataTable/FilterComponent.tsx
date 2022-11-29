import React from "react";
import { DatePicker, Input, Select, Radio, Row, Col } from "antd";

const FilterComponent = ({ value, component, onChange }: any) => {

  const val = value ? value.value : null;

  switch (component.name) {
    case "select":
      return (
        <Select
          style={{ width: "100%" }}
          {...component}
          value={val}
          onChange={onChange}
        >
          {component &&
            component.fetchData().map((row: any) => (
              <Select.Option key={row.value} value={row.value}>
                {row.displayText}
              </Select.Option>
            ))}
        </Select>
      );

    case "daterange":
      return (
        <DatePicker.RangePicker
          value={val}
          {...component}
          onChange={onChange}
        />
      );

    case "radio":
      return (
        <>
        
          <Radio.Group onChange={onChange} value={val} {...component} style={{width:"100%"}}>
            <Row>
            {component &&
                  component.fetchData().map((row: any) => (
                <Col xs={24} lg={24} xl={12} xxl={12}  key={row.value}>
                <Radio key={row.value} value={row.value}>
                        {row.displayText}
                      </Radio>
                </Col>
              ))}
              </Row>
          </Radio.Group>
        </>
      );

    default:
      return (
        <Input
          {...component}
          value={val}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

export default FilterComponent;
