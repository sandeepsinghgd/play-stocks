import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGlobalConfig } from "../../api/globalConfig";
import { setReferralBonus, setSignUpBonus } from "../../redux/actions/bonus";
import Bonus from "./Bonus";
import GlobalConfiguration from "./GlobalConfiguration";
import MailTab from "./MailTab";
import "../../styles/_configuration.scss";
import Token from "./Token";

const { TabPane } = Tabs;
const callback = () => {};

function SystemConfiguration() {
  const dispatch = useDispatch();

  const fetchRefferalBonus = async () => {
    const response = await getGlobalConfig(2);
    dispatch(setReferralBonus(response?.data?.result));
    dispatch(setSignUpBonus(response?.data?.result));
  };

  useEffect(() => {
    fetchRefferalBonus();
  }, []);

  return (
    <Tabs
      type="card"
      defaultActiveKey="1"
      onChange={callback}
      className="configurationTab mt-4"
    >
      <TabPane tab="Mail" key="1">
        <MailTab />
      </TabPane>
      <TabPane tab="Global Configuration" key="2">
        <GlobalConfiguration />
      </TabPane>
      <TabPane tab="Bonus" key="3">
        <Bonus />
      </TabPane>
      <TabPane tab="Token" key="4">
        <Token />
      </TabPane>
    </Tabs>
  );
}

export default SystemConfiguration;
