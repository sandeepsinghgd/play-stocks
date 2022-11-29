import { message, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import CRUDDataTable from "../../components/DataTable/dataTable";
import {
  withdrawRequestList,
  withdrawStatusUpdate,
} from "../../api/withdrawRequests";
import "../../styles/withdrawRequest.scss";
import { AiOutlineMail } from "react-icons/ai";

function totalPlayerFunction() {
  const [draw, setDraw] = useState(0);
  const [isActionPerform, setActionPerform] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectVal, setSelectVal] = useState<any>("");
  const selectedRowId: any = [];

  // const exportWithdrawRequest = async() =>{
  //   let params: any;
  //   // params= {...paramsVal,

  //   // }
  //   return  await exportWithdrawRequestList(params);
  // }

  // const { RangePicker } = DatePicker;
  const { confirm } = Modal;

  const statusUpdate = async () => {
    try {
      let value;
      switch (selectVal) {
        case "Pending":
          value = 1;
          break;
        case "Completed":
          value = 2;
          break;
        case "Queued":
          value = 3;
          break;
        case "Cancelled":
          value = 4;
          break;
      }
      const params: any = {
        request_ids: selectedRowId,
        status_id: value,
      };
      const response = await withdrawStatusUpdate(params);
      if (response.data.success) {
        message.success({
          content: response.data.message,
          style: { fontWeight: "400", color: "green" },
        });
        setSelectedRowKeys([]);
        setActionPerform(true);
        setDraw(draw + 1);
        setDraw(0);
      }
    } catch (err: any) {
      message.error({
        content: err.response.data.message,
        style: { fontWeight: "400", color: "red" },
      });
      setActionPerform(true);
    }
  };

  function onSubmitButton() {
    selectVal
      ? confirm({
          title: "Do you want to Update Status?",
          okText: "Yes",
          cancelText: "No",
          onOk: () => {
            setActionPerform(false);
            selectVal
              ? statusUpdate()
              : message.error("Please select a Status first.");
          },
          onCancel: () => {
            setActionPerform(false);
          },
        })
      : message.error("Please select a Status first.");
  }

  const fetchWithdrawRequestList = async (params: any) => {
    params = {
      ...params,
    };
    return await withdrawRequestList(params);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => {
      selectedRowKeys.forEach((rowkeys: any, index: any) => {
        if (rowkeys === record.index) {
          selectedRowId.push(record.id);
        }
      });
    },
  };
  const hasSelected = selectedRowKeys.length > 0;

  const menus = [
    {
      id: 1,
      menu: "Pending",
    },
    {
      id: 2,
      menu: "Completed",
    },
    {
      id: 3,
      menu: "Queued",
    },
    {
      id: 4,
      menu: "Cancelled",
    },
  ];

  const columns: any = [
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
      title: <strong>Date</strong>,
      dataIndex: "transaction_date",
      key: "transaction_date",
      width: "20%",
      sorter: true,
      filter: {
        paramName: "transaction_date",
        label: "Date",
        component: {
          name: "daterange",
        },
        displayFormat: (value: any) => {
          const dates =
            value && value.map((date: any) => date.format("YYYY-MM-DD"));
          return `${dates[0]} to ${dates[1]}`;
        },
        beforeRequest: (value: any) =>
          value &&
          value
            .map((date: any) => date.format("yyyy-MM-DD"))
            .reduce((result: any, date: any, i: any) => {
              if (i === 0) result.start_date = date;
              else result.end_date = date;
              return result;
            }, {}),
      },
      render: (text: any, record: any, value: any) => {
        return <>{record.transaction_date ? record.transaction_date : "N/A"}</>;
      },
    },
    {
      title: <strong>Transaction Id</strong>,
      dataIndex: "transaction_id",
      key: "transaction_id",
      sorter: true,
      width: "20%",
      render: (text: any, record: any, value: any) => {
        return <>{record.transaction_id ? record.transaction_id : "N/A"}</>;
      },
    },
    {
      title: <strong>Full Name</strong>,
      dataIndex: "full_name",
      key: "full_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record?.full_name ? record?.full_name : "N/A"}</>;
      },
    },
    {
      title: <strong>Nick Name</strong>,
      dataIndex: "nick_name",
      key: "nick_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.nick_name ? record.nick_name : "N/A"}</>;
      },
    },
    {
      title: <strong>Phone number</strong>,
      dataIndex: "phone",
      key: "phone",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.phone ? record.phone : "N/A"}</>;
      },
    },
    {
      title: <strong>Email</strong>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {/* {record?.email} */}
            <Tooltip
              title={`${record?.email}`}
              key={"#0A3453"}
              color={"#0A3453"}
            >
              <AiOutlineMail />
            </Tooltip>
          </>
        );
      },
    },
    {
      title: <strong>Winning Balance</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.winning_amount ? record.winning_amount : "N/A"}</>;
      },
    },
    {
      title: <strong>Bank Name</strong>,
      dataIndex: "bank_name",
      key: "bank_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.bank_name ? record.bank_name : "N/A"}</>;
      },
    },
    {
      title: <strong>Account Number</strong>,
      dataIndex: "account_number",
      key: "account_number",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.account_number ? record.account_number : "N/A"}</>;
      },
    },
    {
      title: <strong>IFSC Code</strong>,
      dataIndex: "ifsc_code",
      key: "ifsc_code",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.ifsc_code ? record.ifsc_code : "N/A"}</>;
      },
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record.amount ? record.amount : "N/A"}</>;
      },
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
      sorter: true,
      filter: {
        paramName: "status",
        label: "Status",
        component: {
          name: "radio",
          fetchData: () => [
            { value: 1, displayText: "Pending" },
            { value: 2, displayText: "Completed" },
            { value: 3, displayText: "Queued" },
            { value: 4, displayText: "Cancelled" },
          ],
        },
      },
      render: (text: any, record: any, value: any) => {
        switch (record.status_id) {
          case 1:
            return <>Pending</>;
          case 2:
            return <>Completed</>;
          case 3:
            return <>Queued</>;
          case 4:
            return <>Cancelled</>;
          default:
            return <>N/A</>;
        }
      },
    },
  ];

  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="Withdraw Requests"
        fetchDataFunction={fetchWithdrawRequestList}
        columns={columns}
        sortOrder="transaction_date"
        isButtonShown={false}
        rowKey="index"
        isExportButton={true}
        isActionPerform={isActionPerform}
        isAddGroupTrade={false}
        dropDownMenus={menus}
        rowSelection={rowSelection}
        hasSelected={hasSelected}
        statusUpdate={onSubmitButton}
        setSelectVal={setSelectVal}
        selectVal={selectVal}
        dropDownButtonName="Status"
      />
    </div>
  );
}

export default totalPlayerFunction;
