import React, { useState } from "react";
import { threeCardWinner } from "../../../api/ThreeCTWinner";
import CRUDDataTable from "../../../components/DataTable/dataTable";
// import data from "./winnerdummy.json";

const ThreeCardTradingDb = () => {
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
        return <>{record?.group?.amount}</>;
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

  const fetchThreeCardWinner = async (params: any) => {
    params = {
      ...params,
      rows: 5,
    };
    return await threeCardWinner(params);
  };
  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="50/50 Winners"
        fetchDataFunction={fetchThreeCardWinner}
        columns={columns}
        sortOrder="id"
        rowKey="id"
        isButtonShown={false}
        dbcustomstyle="dbcustomstyle"
        sizeChanger={false}
      />
    </>
  );
};

export default ThreeCardTradingDb;
