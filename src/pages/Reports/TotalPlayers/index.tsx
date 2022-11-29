import { Card, message } from "antd";
import { useState } from "react";
import { BsHash } from "react-icons/bs";
import CRUDDataResultTable from "../../../components/DataTable/CRUDDataResultTable";
import resultData from "./TotalPlayers.json";
import {
  exportTotalPlayerList,
  totalPlayerReportListApi,
} from "../../../api/totalPlayerReport";
import ReportForm from "../../../components/ReportForm";
import moment from "moment";

function TotalPlayers() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [finalResult, setFinalResult] = useState(true); //eslint-disable-line
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paramVal, setParamVal] = useState<any>();
  const [apiResponse, setApiResponse] = useState<any>();

  const finalResultColumn = {
    first: "Group Trading",
    second: "50/50 Trading",
    third: "Total Players",
  };

  const defaultEndDate = moment().format("YYYY-MM-DD");
  // const defaultStartDate =  moment().subtract(1, "day").format("YYYY-MM-DD");

  const totalPlayerFunction = async (params: any) => {
    params = {
      ...params,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const resp = await totalPlayerReportListApi(params);
    setApiResponse(resp?.data);
    return resp;
  };

  const onExportButtonClicked = async () => {
    const params = {
      ...paramVal,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const response = await exportTotalPlayerList(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "total_players_report.xlsx");
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
      title: <strong>Total Players</strong>,
      dataIndex: "total_players",
      key: "total_players",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.total_players ? record?.total_players : "N/A"} </span>
      }
    },
  ];

  // const resetDateHandler = () => {
  //   console.log("reset called")
  //   if (startDate && endDate) {
  //     setStartDate(defaultEndDate);
  //     setEndDate(defaultEndDate);
  //   }
  //   message.destroy();
  // };

  const submit = async (values: any, setFieldError: any) => {
    try {
      setStartDate(values.startDate);
      setEndDate(values.endDate);
    } catch (error: any) {
      if (error.response.status === 422) {
        for (const key in error.response.data.errors) {
          setFieldError(key, error.response.data.errors[key][0]);
        }
      }
      message.destroy();
    }
  };

  return (
    <>
      <Card size="small" className="mb-5">
        <ReportForm
          onSubmit={submit}
          title="Total Players"
          dateFilter={true}
          // resetFormHandler={resetDateHandler}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Card>
      <CRUDDataResultTable
        draw={draw}
        entity="Results"
        fetchDataFunction={totalPlayerFunction}
        columns={columns}
        sortOrder="result_date"
        isButtonShown={false}
        rowKey="index"
        finalResult={finalResult}
        finalResultColumn={finalResultColumn}
        finalResultData={resultData}
        isGameDropdown={true}
        isContestDropdown={true}
        startDate={startDate}
        endDate={endDate}
        exportButtonClicked={onExportButtonClicked}
        setParamVal={setParamVal}
        apiResponse={apiResponse}
        setCreateNew={false}
        // contestListApiFunction={contestList}
      />
    </>
  );
}

export default TotalPlayers;
