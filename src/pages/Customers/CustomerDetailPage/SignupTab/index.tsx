import React, { useEffect, useState } from "react";
import { getSignUpHistory } from "../../../../api/customerTransaction";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import { message } from "antd";
import { useParams } from "react-router";
import { viewCustomer } from "../../../../api/customer";
import { BsHash } from "react-icons/bs";

const SignUpTab = () => {
  const id: any = useParams();
  const [draw, setDraw] = useState(0); // eslint-disable-line
  const [profileData, setProfileData] = useState<any>();
  const SignupBalance = "Signup Balance";
  useEffect(() => {
    setProfileData(fetchProfile());
  }, []);
  const fetchProfile = async () => {
    const response = await viewCustomer(id.id);
    const data = response.data.result;
    setProfileData(data);
  };
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
      title: <strong>Bonus Type</strong>,
      dataIndex: "bonus_type",
      key: "bonus_type",
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
      title: <strong>Transaction Date</strong>,
      dataIndex: "transaction_date",
      key: "transaction_date",
      sorter: true,
    },
    // {
    // title: <strong>Transaction Type</strong>,
    // dataIndex: "transaction_type",
    // key: "transaction_type",
    // render: (text: any, record: any, value: any) => {
    // return (
    // <>
    // {record.transaction_type === 1
    // ? "Add Fund"
    // : record.transaction_type === 2
    // ? "Withdraw"
    // : "Trade"}
    // </>
    // );
    // },
    // },
    {
      title: <strong>Operation Type</strong>,
      dataIndex: "operation_type",
      key: "operation_type",
      filter: {
        paramName: "operation_type",
        label: "Operation Type",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "Credit" },
            { value: 2, displayText: "Debit" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        switch (record?.operation_type) {
          case 1: {
            return <span>Credit</span>;
          }
          case 2: {
            return <span>Debit</span>;
          }
          case null: {
            return <span>N/A</span>;
          }
          default:
            return <span>{record?.operation_type}</span>;
        }
      },
    },
    {
      title: <strong>Trade Type</strong>,
      dataIndex: "trade_type",
      key: "trade_type",
      filter: {
        paramName: "trade_type",
        label: "Trade Type",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "Group Trade" },
            { value: 2, displayText: "50/50 Trade" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        switch (record?.trade_type) {
          case 1: {
            return <span>Group trade</span>;
          }
          case 2: {
            return <span>50/50 Trade</span>;
          }
          case null: {
            return <span>N/A</span>;
          }
          default:
            return <span>{record?.trade_type}</span>;
        }
      },
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: <strong>Description</strong>,
      dataIndex: "description",
      key: "description",
      render: (text: any, record: any, value: any) => {
        return <>{record?.description != null ? record?.description : "N/A"}</>;
      },
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchSignUpHistory = async (params: any) => {
    try {
      params = {
        ...params,
      };
      return await getSignUpHistory(id.id, params);
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Sign Up History"
        fetchDataFunction={fetchSignUpHistory}
        columns={columns}
        sortOrder="id"
        isButtonShown={false}
        rowKey="id"
        centerData={
          <small>
            {`${SignupBalance} : ₹ ${profileData?.signup_money?.split(".")[0]} |
            ${profileData?.signup_coin?.split(".")[0]} Coins`}
          </small>
        }
      />
    </>
  );
};

export default SignUpTab;
