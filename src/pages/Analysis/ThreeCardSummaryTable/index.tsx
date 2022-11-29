import { Card } from "antd";
import React from "react";
import { useTypedSelector } from "../../../hooks/useTypeSelector";

const ThreeCardSummaryTable = ({
  ThreeCardUsers,
  ThreeCardInvestedAmount,
  ThreeCardCommission,
  ThreeCardAmountDistributed,
  ThreeCardTotal,
}: any) => {
  const gridStyle: React.CSSProperties = {
    width: "50%",
    textAlign: "center",
  };
  const gridHeadingStyle: React.CSSProperties = {
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
  };
  const { ThreeCardData } = useTypedSelector((state) => state.GroupTradeReducer);

  return (
    <Card title="50/50 Summary" className="threeCardGroupSummary">
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridHeadingStyle}>Parameters</Card.Grid>
        <Card.Grid hoverable={false} style={gridHeadingStyle}>
          Values
        </Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>Unique Users</Card.Grid>
        <Card.Grid style={gridStyle}>{ThreeCardData?.unique_user}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>Total Users</Card.Grid>
        <Card.Grid style={gridStyle}>{ThreeCardUsers}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>Total Invested Amount</Card.Grid>
        <Card.Grid style={gridStyle}>{ThreeCardInvestedAmount?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>Total Commission</Card.Grid>
        <Card.Grid style={gridStyle}>{ThreeCardCommission?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>Total Amount Distributed</Card.Grid>
        <Card.Grid style={gridStyle}>{ThreeCardAmountDistributed?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>Total</Card.Grid>
        <Card.Grid style={gridStyle}>{ThreeCardTotal?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}></Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}></Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridHeadingStyle}>Difference</Card.Grid>
        <Card.Grid style={gridHeadingStyle}>{ThreeCardInvestedAmount - ThreeCardTotal}</Card.Grid>
      </div>
    </Card>
  );
};

export default ThreeCardSummaryTable;
