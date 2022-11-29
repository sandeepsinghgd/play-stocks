import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import CRUDDataResultTable from "../../../components/DataTable/CRUDDataResultTable";
import {
  exportWithdrawalsreport,
  getWithdrawalsreport,
} from "../../../api/report";
import ReportForm from "../../../components/ReportForm";
import { Card } from "antd";
import moment from "moment";

function Withdrawals() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [apiResponse, setApiResponse] = useState<any>();
  const [isActionPerform, setActionPerform] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paramVal, setParamVal] = useState<any>();
  const finalResultColumn = { third: "Total Withdrawal Amount" };
  const defaultEndDate = moment().format("YYYY-MM-DD");
  // const defaultStartDate =  moment().subtract(1, "day").format("YYYY-MM-DD");

  const onExportButtonClicked = async () => {
    const params = {
      ...paramVal,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const response = await exportWithdrawalsreport(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "withdrawals.xlsx");
    document.body.appendChild(link);
    link.click();
  };


  const totalWithdrawals = async (params: any) => {
    params = {
      ...params,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const resp = await getWithdrawalsreport(params);
    setApiResponse(resp?.data);
    setActionPerform(false);
    return resp;
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
      title: <strong>Date</strong>,
      dataIndex: "transaction_date",
      key: "transaction_date",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record?.transaction_date.substr(0, 10) || "N/A"}</>;
      },
    },
    {
      title: <strong>Time</strong>,
      dataIndex: "transaction_date",
      key: "transaction_date",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record?.transaction_date.substr(10)}</>;
      },
    },
    {
      title: <strong>Customer</strong>,
      dataIndex: "customer",
      key: "customer",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{record?.customer ? record?.customer : "N/A"} </>;
      },
    },
    {
      title: <strong>Nick Name</strong>,
      dataIndex: "nick_name",
      key: "nick_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <>{ record?.nick_name || "N/A"} </>;
      },
    },
    {
      title: <strong>Email</strong>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.email ? record?.email : "N/A"} </span>
      }
    },
    {
      title: <strong>Contact No.</strong>,
      dataIndex: "contact_no",
      key: "contact_no",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.contact_no ? record?.contact_no : "N/A"} </span>
      }
    },
    {
      title: <strong>Account</strong>,
      dataIndex: "account_number",
      key: "account_number",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.account_number ? record?.account_number : "N/A"} </span>
      }
    },
    {
      title: <strong>IFSC</strong>,
      dataIndex: "ifsc_code",
      key: "ifsc_code",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.ifsc_code ? record?.ifsc_code : "N/A"} </span>
      }
    },
    {
      title: <strong>Type</strong>,
      dataIndex: "account_type",
      key: "account_type",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.account_type ? record?.account_type : "N/A"} </span>
      }
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.amount ? record?.amount : "N/A"} </span>
      }
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.status ? record?.status : "N/A"} </span>
      }
    },
    {
      title: <strong>Remarks</strong>,
      dataIndex: "remark",
      key: "remark",
      sorter: true,
      render: (text: any, record: any, values: any) => {
        return <>{record.remark ? record.remark : "N/A"}</>;
      },
    },
  ];

  // const resetDateHandler = () => {
  //   if (startDate && endDate) {
  //     setStartDate("");
  //     setEndDate("");
  //   }
  // };

  const submit = async (values: any, setFieldError: any) => {
    setStartDate(values.startDate);
    setEndDate(values.endDate);
  };

  return (
    <>
      <Card size="small" className="mb-5">
        <ReportForm
          onSubmit={submit}
          title="Withdrawals"
          dateFilter={true}
          // resetFormHandler={resetDateHandler}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Card>
      <CRUDDataResultTable
        draw={draw}
        setDraw={setDraw}
        entity="Results"
        fetchDataFunction={totalWithdrawals}
        columns={columns}
        sortOrder="date"
        isButtonShown={false}
        rowKey="index"
        finalResult={true}
        finalResultColumn={finalResultColumn}
        isStatusDropdown={true}
        exportButtonClicked={onExportButtonClicked}
        startDate={startDate}
        endDate={endDate}
        apiResponse={apiResponse}
        isActionPerform={isActionPerform}
        setParamVal={setParamVal}
      />
    </>
  );
}

export default Withdrawals;
