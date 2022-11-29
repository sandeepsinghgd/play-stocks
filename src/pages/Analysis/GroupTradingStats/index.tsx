import { Table } from "antd";
import React, { FC, useEffect, useState } from "react";
// import data from "./groupStats.json";
import "../../../styles/groupStats.scss";
import CRUDDataTable from "../../../components/DataTable/dataTable";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { BsHash } from "react-icons/bs";
// import { getGroupAnalysis } from "../../../api/groupAnalysis";

interface groupStateProps {
  setUsers?: any;
  setInvestedAmount?: any;
  setCommission?: any;
  setAmountDistributed?: any;
  setFloorAmount?: any;
  setTotal?: any;
  ResultDate?: any;
}

const GroupTradingStats: FC<groupStateProps> = ({
  setUsers,
  setInvestedAmount,
  setCommission,
  setAmountDistributed,
  setFloorAmount,
  setTotal,
}) => {
  const { GroupData } = useTypedSelector((state) => state.GroupTradeReducer);
  const [GroupDataAnalysis, setGroupDataAnalysis] = useState<any>({});
  const [draw, setDraw] = useState(0);

  useEffect(() => {
    setGroupDataAnalysis(GroupData);
    setDraw(draw + 1);
  }, [GroupData]);

  const columns = [
    {
      title: (
        <strong>
          <BsHash />
        </strong>
      ),

      dataIndex: "index",
      key: "index",
    },
    {
      title: <strong>Group Amount</strong>,
      dataIndex: "group_amount",
      key: "group_amount",
      sorter: true,
    },
    {
      title: <strong>No. of Users</strong>,
      dataIndex: "total_bid",
      key: "total_bid",
      sorter: true,
    },
    {
      title: <strong>Total Invested Amount</strong>,
      dataIndex: "invest_amount",
      key: "invest_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        const investAmt = record?.invest_amount;
        return <>{investAmt?.toFixed(2)}</>;
      },
    },
    {
      title: <strong>Commission</strong>,
      dataIndex: "commission_amount",
      key: "commission_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        const commissionAmt = record?.commission_amount;
        return <>{commissionAmt?.toFixed(2)}</>;
      },
    },
    {
      title: <strong>Prize Distribution Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        const winningAmt = record?.winning_amount;
        return <>{parseFloat(winningAmt)?.toFixed(2)}</>;
      },
    },
    {
      title: <strong>Floor Amount</strong>,
      dataIndex: "floor_amount",
      key: "floor_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        const floorAmt = record?.floor_amount;
        return <>{floorAmt?.toFixed(2)}</>;
      },
    },
    {
      title: <strong>Total</strong>,
      dataIndex: "total",
      key: "total",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        const grouptotal =
          parseFloat(record?.commission_amount) +
          parseFloat(record?.winning_amount) +
          parseFloat(record?.floor_amount);

        return <>{grouptotal?.toFixed(2)}</>;
      },
    },
    {
      title: <strong>Is Matched?</strong>,
      dataIndex: "isMatched",
      key: "isMatched",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        const grouptotal =
          parseFloat(record?.commission_amount) +
          parseFloat(record?.winning_amount) +
          parseFloat(record?.floor_amount);
        return <>{record.invest_amount == grouptotal ? "TRUE" : "FALSE"}</>;
      },
    },
  ];

  if (GroupDataAnalysis.result == undefined) {
    return null;
  }

  return (
    <div style={{ border: "1px solid #0A3453" }} className="groupCardTable">
      <CRUDDataTable
        draw={draw}
        entity="Group Trading Stats"
        fetchDataFunction={() => {
          return GroupDataAnalysis.result;
        }}
        columns={columns}
        sortOrder="id"
        isButtonShown={false}
        rowKey="id"
        analysisCustomStyle={true}
        sizeChanger={false}
        summary={(pageData: any) => {
          let totalInvestedAmount = 0;
          let totalUsers = 0;
          let totalCommission = 0;
          let totalWinningAmount = 0;
          let totalFloorAmount = 0;
          let dayTotal = 0;

          pageData.forEach(
            ({
              invest_amount,
              total_bid,
              commission_amount,
              winning_amount,
              floor_amount,
            }: any) => {
              totalInvestedAmount += invest_amount;
              totalUsers += total_bid;
              totalCommission += commission_amount;
              totalWinningAmount += parseFloat(winning_amount);
              totalFloorAmount += floor_amount;
              dayTotal +=
                parseFloat(commission_amount) +
                parseFloat(winning_amount) +
                parseFloat(floor_amount);
            }
          );
          setUsers(totalUsers);
          setInvestedAmount(totalInvestedAmount);
          setCommission(totalCommission);
          setAmountDistributed(totalWinningAmount);
          setFloorAmount(totalFloorAmount);
          setTotal(dayTotal);

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  {" "}
                  <span style={{ fontWeight: "500" }}>Grand Total</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span style={{ fontWeight: "500" }}>{totalUsers}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span style={{ fontWeight: "500" }}>
                    {totalInvestedAmount?.toFixed(2)}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <span style={{ fontWeight: "500" }}>{totalCommission?.toFixed(2)}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span style={{ fontWeight: "500" }}>
                    {totalWinningAmount?.toFixed(2)}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <span style={{ fontWeight: "500" }}>{totalFloorAmount?.toFixed(2)}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <span style={{ fontWeight: "500" }}>{dayTotal?.toFixed(2)}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <span style={{ fontWeight: "500" }}>
                    {totalInvestedAmount == dayTotal ? "TRUE" : "FALSE"}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default GroupTradingStats;
