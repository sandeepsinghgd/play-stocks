import { message, Modal, Switch, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import {
  getBonusSwitch,
  updateBonuStatusSwitch,
} from "../../../api/globalConfig";

const { confirm } = Modal;
const BonusSwitch = () => {
  const [switchState, setSwitchState] = useState(null);
  const [isActionPerform, setActionPerform] = useState(false); //eslint-disable-line

  const updateStatus = async (status: any, value: any) => {
    try {
      setSwitchState(status);
      const payload = {
        use_for: value,
        value: status,
      };
      const response = await updateBonuStatusSwitch(payload);
      if (response.data.success) {
        message.success(response.data.message);
        setActionPerform(true);
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  useEffect(() => {
    const payload = {
      use_for: "",
      value: "",
    };
    getBonuStatuss(payload);
  }, []);
  const getBonuStatuss = async (payload: any) => {
    const res = await getBonusSwitch(payload);

    setSwitchState(res?.data?.result?.value);
  };

  return (
    <>
      <Tooltip title={switchState == 1 ? "Disable" : "Enable"}>
        <Switch
          size="small"
          style={{ backgroundColor: switchState == 1 ? "#0A3453" : "lightgray" }}
          checked={switchState == 1}
          onChange={(value: any) => {
            confirm({
              title:
                switchState == 1
                  ? "Do you want to Disable signup-bonus?"
                  : "Do you want to Enable signup-bonus?",
              okText: "Yes",
              cancelText: "No",
              onOk: () => {
                setActionPerform(false);
                updateStatus(value === true ? 1 : 0, "change");
              },
            });
          }}
        />
      </Tooltip>
    </>
  );
};

export default BonusSwitch;
