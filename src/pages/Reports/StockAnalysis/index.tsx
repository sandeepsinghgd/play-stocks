import React, { useState } from "react";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
  BsHash,
} from "react-icons/bs";
import CRUDDataResultTable from "../../../components/DataTable/CRUDDataResultTable";
import resultData from "./StockAnalysis.json";
import ReportForm from "../../../components/ReportForm";
import { Card } from "antd";
import {
  stockAnalysisListApi,
  stockAnalysisExportApi,
} from "../../../api/stockAnalysis";
import moment from "moment";

function StockAnalysis() {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [paramVal, setParamVal] = useState<any>();
  const [singleDate, setSingleDate] = useState<any>();

  const defaultDate = moment().format("YYYY-MM-DD");

  const stockAnalysisFunction = async (params: any) => {
    params = {
      ...params,
      date: singleDate || defaultDate,
    };
    return await stockAnalysisListApi(params);
  };

  const onExportButtonClicked = async () => {
    const params = {
      ...paramVal,
      date: singleDate || defaultDate,
    };
    const response = await stockAnalysisExportApi(params);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "today's_stock_analysis.xlsx");
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
      title: <strong>Stock Symbol</strong>,
      dataIndex: "stock_symbol",
      key: "stock_symbol",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.stock_symbol ? record?.stock_symbol : "N/A"} </span>
      }
    },
    {
      title: <strong>Stock Name</strong>,
      dataIndex: "stock_name",
      key: "stock_name",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.stock_name ? record?.stock_name : "N/A"} </span>
      }
    },
    {
      title: <strong>Stock Value</strong>,
      dataIndex: "stock_value",
      key: "stock_value",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.stock_value ? record?.stock_value : "N/A"} </span>
      }
    },
    {
      title: <strong>Difference</strong>,
      dataIndex: "difference",
      key: "difference",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.difference ? record?.difference : "N/A"} </span>
      }
    },
    {
      title: <strong>Movement</strong>,
      dataIndex: "movement",
      key: "movement",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.movement === "Up" ? (
              <BsFillArrowUpSquareFill style={{ color: "green" }} />
            ) : (
              <BsFillArrowDownSquareFill style={{ color: "red" }} />
            )}
          </>
        );
      },
    },
    {
      title: <strong>No. of Trades</strong>,
      dataIndex: "total_trades",
      key: "total_trades",
      sorter: true,
      render: (text:any, record:any, value:any) => {
        return <span>{record?.total_trades ? record?.total_trades : "N/A"} </span>
      }
    },
  ];

  const submit = async (values: any, setFieldError: any) => {
    // setStartDate(values.startDate);
    // setEndDate(values.endDate);
    setSingleDate(values?.date);
  };

  return (
    <>
      <Card size="small" className="mb-5">
        <ReportForm
          onSubmit={submit}
          title="Today's Stock Analysis"
          dateFilter={false}
          setSingleDate={setSingleDate}
        />
      </Card>
      <CRUDDataResultTable
        draw={draw}
        entity="Results"
        fetchDataFunction={stockAnalysisFunction}
        columns={columns}
        sortOrder="result_date"
        isButtonShown={false}
        rowKey="index"
        finalResult={true}
        finalResultColumn={""}
        finalResultData={resultData}
        isGameDropdown={false}
        isMovementDropdown={true}
        exportButtonClicked={onExportButtonClicked}
        setParamVal={setParamVal}
        singleDateFilter={true}
        singleDate={singleDate}
      />
    </>
  );
}

export default StockAnalysis;
