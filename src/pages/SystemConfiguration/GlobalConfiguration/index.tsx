import { Row, Col, Input, Button, Switch, Modal, message, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import GlobalConfigurationDrawer from "./GlobalConfigurationDrawer";
import { getGlobalConfig, updateGlobalConfig } from "../../../api/globalConfig";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { maxWithDrawAmount, minWithdrawAmount } from "../../../api/notification";
const { confirm } = Modal;
function GlobalConfiguration() {
  const [visible, setVisible] = useState(false);
  const [globleConfiguration, setGlobleConfiguration] = useState([]);
  const [setting, setSetting] = useState({});
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const [minimumWithdrawAmount, setMinimumWithdrawAmount] = useState("");
  const [maximumWithdrawAmount, setMaximumWithdrawAmount] = useState("");

  const fetchSettings = async () => {
    const response = await getGlobalConfig(1);
    setGlobleConfiguration(response?.data?.result);
  };

  const fetchAmount = async () => {
    const min = await minWithdrawAmount();
    const max = await maxWithDrawAmount();
    setMinimumWithdrawAmount(min.data);
    setMaximumWithdrawAmount(max.data);
  };

  useEffect(()=>{
    fetchAmount();
  },[]);

  useEffect(() => {
    fetchSettings();
  }, []);
  const updateStatus = async (
    status: any,
    key: any,
    id: any,
    description: any
  ) => {
    try {
      const payload = {
        id,
        key,
        value: status,
        description,
      };
      const response = await updateGlobalConfig(payload);
      if (response.data.success) {
        message.success(response.data.message);
        fetchSettings();
      }
    } catch (err: any) {
      message.error(err);
    }
  };

  return (
    <>
      {globleConfiguration.map((globalConfig: any, i: any) => {
        return (
          <Row className="align-items-center" key={i}>
            <Col span={6} className="me-3 mb-2">
              <label style={{ fontWeight: "400", color: "#0A3453" }}>
                {globalConfig.description}:
              </label>
            </Col>
            {globalConfig.description ==
            "Application force fully update or not." ? (
              <Col span={7} className="me-3 mb-2">
                <Tooltip
                  title={globalConfig.value == 0 ? "Activate" : "Inactivate"}
                >
                  <Switch
                    size="small"
                    checked={globalConfig.value != 0}
                    onChange={(value: any) =>
                      confirm({
                        title:
                          "Do you want to forcefully update the Application?",
                        okText: "Yes",
                        cancelText: "No",
                        onOk: () => {
                          updateStatus(
                            value === true ? 1 : 0,
                            globalConfig.key,
                            globalConfig.id,
                            globalConfig.description
                          );
                        },
                        onCancel: () => {},
                      })
                    }
                  />
                </Tooltip>
              </Col>
            ) : (
              <Col span={7} className="me-3 mb-2">
                <Input
                  placeholder="Enter Value"
                  value={globalConfig.value}
                  readOnly
                />
              </Col>
            )}

            {currentUserPermissions.includes("system_setting_update") &&
              (globalConfig.description ==
                "Application force fully update or not." ||
              globalConfig.description == "Next Day Market Opening Date" ||
              globalConfig.description == "Last Day Market Opening Date" ? (
                ""
              ) : (
                <Button
                  type="primary"
                  icon={<AiTwotoneEdit />}
                  onClick={() => {
                    setVisible(true);
                    setSetting(globalConfig);
                  }}
                  className="flex justify-center items-center"
                ></Button>
              ))}
            <GlobalConfigurationDrawer
            minimumWithdrawAmount={minimumWithdrawAmount}
            maximumWithdrawAmount={maximumWithdrawAmount}
              visible={visible}
              setting={setting}
              onClose={() => {
                setSetting([]);
                setVisible(false);
                fetchSettings();
              }}
            />
          </Row>
        );
      })}
    </>
  );
}

export default GlobalConfiguration;
