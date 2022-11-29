import { Form, Space, Input, Button } from "antd";
import React from "react";
import { AiFillDelete,} from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import "../../../styles/_groupTrading.scss";

function WinningRatio(props: any) {
    return (
        <>

            <Form.List name="winningRatioList">
                {(fields: any, { add, remove }: any) => (
                    <>
                        <div className='d-flex'>
                            <label className='d-inline winRatioLbl'>{props.label}</label>
                            <Form.Item className='d-inline winRatioFormItem'>
                                <Button
                                    className='d-inline winRatioBtn'
                                    type="dashed"
                                    size='small'
                                    onClick={() => add()}

                                    icon={<GoPlus />}
                                >
                                </Button>
                            </Form.Item>
                        </div>
                        {fields.map(({ key, name, ...restField }: any) => (
                            <Space className='winRatioItems d-flex'
                                wrap={true}
                                key={key}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, "min"]}
                                >
                                    <Input placeholder="Minimum User Count" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, "max"]}
                                >
                                    <Input placeholder="Maximum User Count" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, "Ratio"]}
                                >
                                    <Input placeholder="Ratio" />
                                </Form.Item>

                                <AiFillDelete onClick={() => remove(name)} />
                            </Space>
                        ))}
                    </>
                )}
            </Form.List>
        </>
    );
}

export default WinningRatio;
