import { message } from "antd";
import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import { useParams } from "react-router";
import { getReferralHistory } from "../../../../api/customer";
import CRUDDataTable from "../../../../components/DataTable/dataTable";

const ReferralTab = () => {
  const id: any = useParams();
  const [draw, setDraw] = useState(0); // eslint-disable-line
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
      title: <strong>Name</strong>,
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record?.inviter_user?.nick_name}</>;
      },
    },
    {
      title: <strong>Transaction Date</strong>,
      dataIndex: "transaction_date",
      key: "transaction_date",
      sorter: true,
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      // render: (text: any, record: any, value: any) => {
      //   return <>{record?.amount.split(".")[0]}</>;
      // },
    },
    {
      title: <strong>Bonus Type</strong>,
      dataIndex: "bonus_type",
      key: "bonus_type",
      filter: {
        paramName: "bonus_type",
        label: "Bonus Type",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "Money" },
            { value: 2, displayText: "Coin" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        switch (record?.bonus_type) {
          case 1: {
            return <span>Money</span>;
          }
          case 2: {
            return <span>Coin</span>;
          }
          case null: {
            return <span>N/A</span>;
          }
          default:
            return <span>{record?.bonus_type}</span>;
        }
      },
    },
    {
      title: <strong>User Type</strong>,
      dataIndex: "user_type",
      key: "user_type",
      sorter: true,
    },
  ];

  const fetchReferralHistory = async (params: any) => {
    try {
      params = {
        ...params,
      };
      return await getReferralHistory(id.id, params);
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Referral History"
        fetchDataFunction={fetchReferralHistory}
        columns={columns}
        sortOrder="id"
        isButtonShown={false}
        rowKey="id"
      />
    </>
  );
};

export default ReferralTab;
