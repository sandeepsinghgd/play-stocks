import React, { useState } from "react";
import { BsHash } from "react-icons/bs";
import resultData from "./WinnersAndLosers.json";
import CRUDDataResultTable from "../../../components/DataTable/CRUDDataResultTable";
import {
  exportWinnersAndLoosersApi,
  getWinnnersAndLoosersListApi,
} from "../../../api/winnerAndLosser";
import ReportForm from "../../../components/ReportForm";
import { Card, message } from "antd";
import moment from "moment";

function WinnersAndLosers() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paramVal, setParamVal] = useState<any>();
  const [apiResponse, setApiResponse] = useState<any>();
  const defaultEndDate = moment().format("YYYY-MM-DD");
  // const defaultStartDate =  moment().subtract(1, "day").format("YYYY-MM-DD");

  const onExportButtonClicked = async () => {
    // let params = paramsVal;
    const params = {
      ...paramVal,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const response = await exportWinnersAndLoosersApi(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "winners_losers_report.xlsx");
    document.body.appendChild(link);
    link.click();
  };
  

  const WinningAndLoserFunction = async (params: any) => {
    params = {
      ...params,
      start_date: startDate || defaultEndDate,
      end_date: endDate || defaultEndDate,
    };
    const resp = await getWinnnersAndLoosersListApi(params);
    setApiResponse(resp?.data);
    return resp;
  };
  
  const finalResultColumn = {
    first: "Group Trading",
    second: "50/50 Trading",
    third: "Total",
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
      render: (text: any, record: any, value: any) => {
        return <> {record?.result_date || "N/A"}</>;
      },
    },
    {
      title: <strong>Game</strong>,
      dataIndex: "game_name",
      key: "game_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.game_name || "N/A"}</>;
      },
    },
    {
      title: <strong>Contests</strong>,
      dataIndex: "contest",
      key: "contest",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.contest || "N/A"}</>;
      },
    },
    {
      title: <strong>Customer</strong>,
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.customer_name || "N/A"}</>;
      },
    },
    {
      title: <strong>Nick Name</strong>,
      dataIndex: "nick_name",
      key: "nick_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.nick_name || "N/A"}</>;
      },
    },
    {
      title: <strong>Email Id</strong>,
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.email || "N/A"}</>;
      },
    },
    {
      title: <strong>Contact Number</strong>,
      dataIndex: "phone",
      key: "phone",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.phone || "N/A"}</>;
      },
    },
    {
      title: <strong>Result</strong>,
      dataIndex: "result",
      key: "result",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        switch (record?.game_name) {
          case "Group Trading":
            return <> {record?.result} </>;
          case "50/50 Trading":
            if(record?.result === 1){
              return <> Win </>;
            } else {
              return <> Loss </>
            }
          default:
            return <> N/A</>;
        }
      },
    },
    {
      title: <strong>Points</strong>,
      dataIndex: "points",
      key: "points",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.points || "N/A"}</>;
      },
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return <> {record?.winning_amount || "N/A"}</>;
      },
    },
  ];

  // const resetDateHandler = () => {
  //   if (startDate && endDate) {
  //     setStartDate("");
  //     setEndDate("");
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
          title="Winners/Losers"
          dateFilter={true}
          // resetFormHandler={resetDateHandler}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Card>
      <CRUDDataResultTable
        draw={draw}
        entity="Results"
        fetchDataFunction={WinningAndLoserFunction}
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

export default WinnersAndLosers;
