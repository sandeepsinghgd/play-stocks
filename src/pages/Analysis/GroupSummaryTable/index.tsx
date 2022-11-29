import { Card } from "antd";
import React from "react";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import "../../../styles/groupSummary.scss";

const GroupSummaryTable = ({
  users,
  investedAmount,
  commission,
  amountDistributed,
  floorAmount,
  total,
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
  const { GroupData } = useTypedSelector((state) => state.GroupTradeReducer);
  return (
    <Card title="Group Trading Summary" className="groupSummary">
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridHeadingStyle}>
          Parameters
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridHeadingStyle}>
          Values
        </Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Unique Users
        </Card.Grid>
        <Card.Grid style={gridStyle}>{GroupData?.unique_user}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Total Users
        </Card.Grid>
        <Card.Grid style={gridStyle}>{users}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Total Invested Amount
        </Card.Grid>
        <Card.Grid style={gridStyle}>{investedAmount?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Total Commission
        </Card.Grid>
        <Card.Grid style={gridStyle}>{commission?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Total Amount Distributed
        </Card.Grid>
        <Card.Grid style={gridStyle}>{amountDistributed?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Total Floor Amount
        </Card.Grid>
        <Card.Grid style={gridStyle}>{floorAmount?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          Total
        </Card.Grid>
        <Card.Grid style={gridStyle}>{total?.toFixed(2)}</Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridStyle}></Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}></Card.Grid>
      </div>
      <div style={{ display: "flex" }}>
        <Card.Grid hoverable={false} style={gridHeadingStyle}>
          Difference
        </Card.Grid>
        <Card.Grid style={gridHeadingStyle}>{investedAmount - total}</Card.Grid>
      </div>
    </Card>
  );
};

export default GroupSummaryTable;
