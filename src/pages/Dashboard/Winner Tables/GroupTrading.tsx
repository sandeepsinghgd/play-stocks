import React, { useState } from "react";
import { getGCTWinners } from "../../../api/GroupCTWinners";
import CRUDDataTable from "../../../components/DataTable/dataTable";
// import data from "./winnerdummy.json";
const GroupTrading = () => {
  const [draw, setDraw] = useState(0); // eslint-disable-line

  const columns = [
    {
      title: <strong>Customer Name</strong>,
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: <strong>Group Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.group.amount}</>;
      },
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.winning_amount ? record.winning_amount : "NA"}</>;
      },
    },
  ];

  const fetchGroupTradingWinners = async (params: any) => {
    params = {
      ...params,
      rows: 5,
    };
    return await getGCTWinners(params);
  };
  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="Group Trade Winners"
        fetchDataFunction={fetchGroupTradingWinners}
        columns={columns}
        sortOrder="id"
        rowKey="id"
        isButtonShown={false}
        dbcustomstyle="dbcustomstyle"
        sizeChanger={false}
      />
    </div>
  );
};

export default GroupTrading;
