import { Col, Row, Tabs } from "antd";
import React, { useRef } from "react";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import GroupTradingTab from "./GroupTradingTab";
import ReferralTab from "./ReferralTab";
import SummaryTab from "./SummaryTab";
import ThreeCardTab from "./ThreeCardTradingTab";
import TransactionHistoryTab from "./TransactionHistoryTab";
import "../../../styles/_detailPage.scss";

const { TabPane } = Tabs;

const callback = () => {};

const CustomerDetailPage = () => {
  // const transactionRef = useRef<HTMLDivElement>(null);
  const { currentUserPermissions } = useTypedSelector((state) => state.user);
  const transactionRef = useRef<any>();
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={6}>
          <SummaryTab
            onHandleClick={() => {
              transactionRef.current.scrollIntoView({
                block: "start",
                behavior: "smooth",
              });
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={18} className="ps-3">
          {currentUserPermissions.includes("view_trading_bids") && (
            <Tabs onChange={callback} type="card" className="detailPageTab">
              <TabPane tab="Group Trading" key="1">
                <GroupTradingTab />
              </TabPane>
              <TabPane tab="50/50 Trading" key="2">
                <ThreeCardTab />
              </TabPane>
              {/* <TabPane tab="Sign Up History" key="3">
                <SignUpTab />
              </TabPane> */}
              <TabPane tab="Referral History" key="4">
                <ReferralTab />
              </TabPane>
            </Tabs>
          )}
          {currentUserPermissions.includes("view_wallet_history") && (
            <div ref={transactionRef}>
              <TransactionHistoryTab />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CustomerDetailPage;
