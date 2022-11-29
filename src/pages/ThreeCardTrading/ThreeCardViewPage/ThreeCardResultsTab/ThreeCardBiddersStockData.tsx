import { useState } from "react";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";

import CRUDDataTable from "../../../../components/DataTable/dataTable";
import ChangePercentage from "../../../../components/StockFields/ChangePercentage";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import StockPoints from "../../../../components/StockFields/ThreeCardTrading/StockPoints";

const ThreeCardBiddersStockData = ({ stockData }: any) => {
  const [draw, setDraw] = useState(0); //eslint-disable-line

  const columns = [
    {
      title: <strong>Name</strong>,
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
      dataIndex: "bid_amount",
      key: "bid_amount",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record.stock_status === 2 ? (
              <div className="flex items-center">
                {record.bid_amount} &nbsp;
                <BsFillArrowDownSquareFill style={{ color: "red" }} />{" "}
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
        return (
          <StockClosingPrice
            item={record.bid_stock_close_price}
            symbol={record.stock_symbol}
            bidDate={record.for_bid_date}
          />
        );
      },
    },
    {
      title: <strong>Stock Movement</strong>,
      dataIndex: "result",
      key: "result",
      render: (text: any, record: any, value: any) => {
        return (
          <ChangePercentage record={record} bidDate={record.for_bid_date} />
        );
      },
    },
    {
      title: <strong>Earned Points</strong>,
      dataIndex: "points",
      key: "points",
      render: (text: any, record: any, value: any) => {
        return <StockPoints record={record} bidDate={record.for_bid_date} />;
      },
    },
  ];
  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity=""
        fetchDataFunction={async () => {
          return stockData;
        }}
        columns={columns}
        sortOrder="id"
        isButtonShown={false}
        rowKey="uuid"
        frequentUpdate={true}
      />
    </>
  );
};
export default ThreeCardBiddersStockData;
