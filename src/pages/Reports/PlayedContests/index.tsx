import { useState } from "react";
import { BsHash } from "react-icons/bs";
import CRUDDataResultTable from "../../../components/DataTable/CRUDDataResultTable";
import resultData from "./PlayedContest.json";
import ReportForm from "../../../components/ReportForm";
import { Card } from "antd";
import moment from "moment";
import {
  playedContestExportApi,
  playedContestListApi,
} from "../../../api/playedContests";

function PlayedContests() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [paramVal, setParamVal] = useState<any>(); //eslint-disable-line
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const defaultEndDate = moment().format("YYYY-MM-DD");
  // const defaultStartDate = moment().subtract(1, "day").format("YYYY-MM-DD");

  const contestListFunction = async (params: any) => {
    params = {
      ...params,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    return await playedContestListApi(params);
  };

  const onExportButtonClicked = async () => {
    // let params = paramsVal;
    const params = {
      ...paramVal,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const response = await playedContestExportApi(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "played_contests.xlsx");
    document.body.appendChild(link);
    link.click();
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
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        const date = record?.transaction_date.substr(0, 10);
        return date || "N/A";
      },
    },
    {
      title: <strong>Game</strong>,
      dataIndex: "trade_type",
      key: "trade_type",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.trade_type ? record?.trade_type : "N/A"} </span>
      }
    },
    {
      title: <strong>Contests</strong>,
      dataIndex: "contest",
      key: "contest",
      // sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.contest ? record?.contest : "N/A"} </span>
      }
    },
    {
      title: <strong> Players</strong>,
      dataIndex: "customer",
      key: "customer",
      // sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.customer ? record?.customer : "N/A"} </span>
      }
    },
    {
      title: <strong> Nick Name</strong>,
      dataIndex: "nick_name",
      key: "nick_name",
      // sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.nick_name ? record?.nick_name : "N/A"} </span>
      }
    },
    {
      title: <strong> Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      // sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.amount ? record?.amount : "N/A"} </span>
      }
    },
    {
      title: <strong> Type</strong>,
      dataIndex: "payment_type",
      key: "payment_type",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <span>
            {record.payment_type.charAt(0).toUpperCase() +
              record.payment_type.substr(1) || "N/A"}
          </span>
        );
      },
    },
    {
      title: <strong> Deducted From</strong>,
      dataIndex: "amount_type",
      key: "amount_type",
      // sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.amount_type ? record?.amount_type : "N/A"} </span>
      }
    },
    {
      title: <strong> Balance</strong>,
      dataIndex: "remaining_amount",
      key: "remaining_amount",
      // sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.remaining_amount ? record?.remaining_amount : "N/A"} </span>
      }
    },
  ];

  const submit = async (values: any, setFieldError: any) => {
    setStartDate(values.startDate);
    setEndDate(values.endDate);
  };

  return (
    <>
      <Card size="small" className="mb-5">
        <ReportForm
          onSubmit={submit}
          title="Contest Transactions"
          dateFilter={true}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Card>
      <CRUDDataResultTable
        draw={draw}
        entity="Results"
        fetchDataFunction={contestListFunction}
        columns={columns}
        sortOrder="transaction_date"
        isButtonShown={false}
        rowKey="index"
        finalResult={true}
        finalResultColumn={""}
        finalResultData={resultData}
        isGameDropdown={true}
        isContestDropdown={true}
        setParamVal={setParamVal}
        exportButtonClicked={onExportButtonClicked}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}

export default PlayedContests;
