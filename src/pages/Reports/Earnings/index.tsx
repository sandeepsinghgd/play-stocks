import { useState } from "react";
import { BsHash } from "react-icons/bs";
import CRUDDataResultTable from "../../../components/DataTable/CRUDDataResultTable";
import resultData from "./earning.json";
import {
  earningReportListApi,
  exportEarningsReport,
} from "../../../api/earningReport";
import ReportForm from "../../../components/ReportForm";
import { Card } from "antd";
import moment from "moment";

function Earnings() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paramVal, setParamVal] = useState<any>();
  const [apiResponse, setApiResponse] = useState<any>();

  const finalResultColumn = {
    first: "Group Trading",
    second: "50/50 Trading",
    third: "Total ",
  };

  const defaultEndDate = moment().format("YYYY-MM-DD");
  // const defaultStartDate =  moment().subtract(1, "day").format("YYYY-MM-DD");

  const totalEarningFunction = async (params: any) => {

  params = {
    ...params,
    start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
  }
    const resp = await earningReportListApi(params);
    setApiResponse(resp?.data);
    return resp;
  };

  const onExportButtonClicked = async () => {
    // let params = paramsVal;
    const params = {
      ...paramVal,
      start_date: startDate || defaultEndDate ,
      end_date: endDate || defaultEndDate,
    };
    const response = await exportEarningsReport(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "earnings_report.xlsx");
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
      dataIndex: "result_date",
      key: "result_date",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.result_date ? record?.result_date : "N/A"} </span>
      }
    },
    {
      title: <strong>Game</strong>,
      dataIndex: "game_name",
      key: "game_name",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.game_name ? record?.game_name : "N/A"} </span>
      }
    },
    {
      title: <strong>Contests</strong>,
      dataIndex: "contest",
      key: "contest",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.contest ? record?.contest : "N/A"} </span>
      }
    },
    {
      title: <strong>Players </strong>,
      dataIndex: "total_players",
      key: "total_players",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.total_players ? record?.total_players : "N/A"} </span>
      }
    },
    {
      title: <strong>Entry Collection</strong>,
      dataIndex: "total_collections",
      key: "total_collections",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.total_collections ? record?.total_collections : "N/A"} </span>
      }
    },
    {
      title: <strong>Prize Distributed</strong>,
      dataIndex: "prize_distibuted",
      key: "prize_distibuted",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.prize_distibuted ? record?.prize_distibuted : "N/A"} </span>
      }
    },
    {
      title: <strong>Earnings</strong>,
      dataIndex: "total_earnings",
      key: "total_earnings",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.total_earnings ? record?.total_earnings : "N/A"} </span>
      }
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
          title="Earning"
          dateFilter={true}
          // resetFormHandler={resetDateHandler}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Card>
      <CRUDDataResultTable
        draw={draw}
        entity="Results"
        fetchDataFunction={totalEarningFunction}
        columns={columns}
        sortOrder="result_date"
        isButtonShown={false}
        rowKey="index"
        finalResult={true}
        finalResultColumn={finalResultColumn}
        finalResultData={resultData}
        isGameDropdown={true}
        isContestDropdown={true}
        exportButtonClicked={onExportButtonClicked}
        startDate={startDate}
        endDate={endDate}
        setParamVal={setParamVal}
        apiResponse={apiResponse}
      />
    </>
  );
}

export default Earnings;
