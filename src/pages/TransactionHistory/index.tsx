import { message, Tooltip } from "antd";
import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import { RiStickyNoteFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getTransactionHistory } from "../../api/customerTransaction";
import CRUDDataTable from "../../components/DataTable/dataTable";
import razorpaylogo from "../../assets/images/RazorpayLogo.png";

const TransactionHistory = () => {
  const [draw, setDraw] = useState(0); //eslint-disable-line
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
      title: <strong>Customer Name</strong>,
      dataIndex: "user_name",
      key: "user_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <Link
            to={{
              pathname: `/customers/${record?.user?.user_id}`,
              state: { fromDashboard: false },
            }}
          >
            <span style={{ fontWeight: "bold", color: "#0A3453" }}>
              {record?.user.name}
            </span>
          </Link>
        );
      },
    },
    {
      title: <strong>Transaction id</strong>,
      dataIndex: "transaction_id",
      key: "transaction_id",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.transaction_id}
            {record?.transaction_type_id === 1 && record?.gateway_id ? (
              <Tooltip
                title={`${record?.gateway_id}`}
                key={"#0A3453"}
                color={"#0A3453"}
              >
                <img src={razorpaylogo} width={20} className="ms-1" />
              </Tooltip>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: <strong>Transaction Date</strong>,
      dataIndex: "transaction_date",
      key: "transaction_date",
      sorter: true,
    },
    {
      title: <strong>Transaction Type</strong>,
      dataIndex: "transaction_type",
      key: "transaction_type",
      filter: {
        paramName: "transaction_type",
        label: "Transaction Type",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "Add Fund" },
            { value: 2, displayText: "Withdraw" },
            { value: 3, displayText: "Trade" },
            { value: 4, displayText: "Referral" },
            { value: 5, displayText: "Refund" },
            { value: 6, displayText: "Prize" },
            { value: 7, displayText: "SignUp Bonus" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        switch (record?.transaction_type?.id) {
          case 1: {
            return <span>Add Fund</span>;
          }
          case 2: {
            return <span>Withdraw</span>;
          }
          case 3: {
            return <span>Trade</span>;
          }
          case 4: {
            return <span>Referral</span>;
          }
          case 5: {
            return <span>Refund</span>;
          }
          case 6: {
            return <span>Prize</span>;
          }
          case 7: {
            return <span>SignUp Bonus</span>;
          }
          case null: {
            return <span>N/A</span>;
          }
          default:
            return record?.transaction_type?.id;
        }
      },
    },
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
            return record?.operation_type;
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
            return <span>Group Trade</span>;
          }
          case 2: {
            return <span>50/50 Trade</span>;
          }
          default:
            return <span>N/A</span>;
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
      title: <strong>Current Balance</strong>,
      dataIndex: "current_amount",
      key: "current_amount",
      sorter: true,
    },
    {
      title: <strong>Description</strong>,
      dataIndex: "description",
      key: "description",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            <Tooltip
              title={`${record.description}`}
              key={"#0A3453"}
              color={"#0A3453"}
            >
              <RiStickyNoteFill
                style={{
                  color: "#0A3453",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
      sorter: true,
    },
  ];

  const fetchTransactionHistory = async (params: any) => {
    try {
      params = {
        ...params,
      };
      return await getTransactionHistory(params);
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <CRUDDataTable
      draw={draw}
      entity="Transaction History"
      fetchDataFunction={fetchTransactionHistory}
      columns={columns}
      sortOrder="id"
      isButtonShown={false}
      rowKey="id"
    />
  );
};

export default TransactionHistory;
