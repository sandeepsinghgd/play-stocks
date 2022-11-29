import { useState } from "react";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import ChangePercentage from "../../../../components/StockFields/ChangePercentage";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import StockPoints from "../../../../components/StockFields/ThreeCardTrading/StockPoints";

const ThreeCardStockData = (props: any) => {
  const [draw, setDraw] = useState(0); //eslint-disable-line

  const columns = [
    {
      title: <strong>Stock</strong>,
      dataIndex: "stock_symbol",
      key: "stock_symbol",
    },
    {
      title: <strong>Stock Price</strong>,
      dataIndex: "bid_stock_price",
      key: "bid_stock_price",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.bid_stock_price != null ? (
              <>{record?.bid_stock_price}</>
            ) : (
              <>N/A</>
            )}
          </>
        );
      },
    },
    {
      title: <strong>Bid Amount</strong>,
      dataIndex: "bid",
      key: "bid",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.stock_status === 2 ? (
              <div className="flex items-center">
                <span>{record.bid_amount} &nbsp; </span>
                <span><BsFillArrowDownSquareFill style={{ color: "red" }} />{" "} </span>
              </div>
            ) : (
              <div className="flex items-center">
                {record.bid_amount} &nbsp;
                <BsFillArrowUpSquareFill style={{ color: "green" }} />
              </div>
            )}{" "}
          </>
        );
      },
    },
    {
      title: <strong>Stock Closing Price</strong>,
      dataIndex: "bid_stock_close_price",
      key: "bid_stock_close_price",
      render: (text: any, record: any, value: any) => {
        return props.isStatusPending === "Pending" ? (
          <>N/A</>
        ) : (
          <StockClosingPrice
            item={record.bid_stock_close_price}
            symbol={record.stock_symbol}
            bidDate={props.bidDate}
          />
        );
      },
    },
    {
      title: <strong>Stock Movement</strong>,
      dataIndex: "result",
      key: "result",
      render: (text: any, record: any, value: any) => {
        return props.isStatusPending === "Pending" ? (
          <strong>N/A</strong>
        ) : (
          <ChangePercentage record={record} bidDate={props.bidDate} />
        );
      },
    },
    {
      title: <strong>Earned Points</strong>,
      dataIndex: "points",
      key: "points",
      render: (text: any, record: any, value: any) => {
        return props.isStatusPending === "Pending" ? (
          <strong>N/A</strong>
        ) : (
          <StockPoints record={record} bidDate={props.bidDate} />
        );
      },
    },
  ];
  return (
    <div>
      <CRUDDataTable
        draw={draw}
        entity="Group Trading"
        fetchDataFunction={() => {
          return props.data;
        }}
        columns={columns}
        sortOrder="id"
        isButtonShown={true}
        rowKey="uuid"
        frequentUpdate={true}
      />
    </div>
  );
};
export default ThreeCardStockData;
