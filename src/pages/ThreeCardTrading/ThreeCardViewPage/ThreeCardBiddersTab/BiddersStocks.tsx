import { useEffect, useState } from "react";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";

import CRUDDataTable from "../../../../components/DataTable/dataTable";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import ChangePercentage from "../../../../components/StockFields/ThreeCardTrading/ChangePercentage";
import StockPoints from "../../../../components/StockFields/ThreeCardTrading/StockPoints";
import { useTypedSelector } from "../../../../hooks/useTypeSelector";
const BiddersStockData = ({ data, bidDate, bidStatus }: any) => {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const { threeCardBiddersLiveData } = useTypedSelector(
    (state) => state.LiveStocksData
  );
  // let findStock: any;

  useEffect(() => {
    setDraw(draw + 1);
  }, [threeCardBiddersLiveData]);

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
        return bidStatus === "Pending" ? (
          <>N/A</>
        ) : (
          <StockClosingPrice
            item={record.bid_stock_close_price}
            symbol={record.stock_symbol}
            bidDate={bidDate}
          />
        );
      },
    },
    {
      title: <strong>Stock Movement</strong>,
      dataIndex: "result",
      key: "result",
      render: (text: any, record: any, value: any) => {
        return bidStatus === "Pending" ? (
          <strong>N/A</strong>
        ) : (
          <ChangePercentage record={record} bidDate={bidDate} />
        );
      },
    },
    {
      title: <strong>Points</strong>,
      dataIndex: "points",
      key: "points",
      render: (text: any, record: any, value: any) => {
        return bidStatus === "Pending" ? (
          <strong>N/A</strong>
        ) : (
          <StockPoints record={record} bidDate={bidDate} />
        );
      },
    },
  ];
  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity=""
        fetchDataFunction={async () => {
          return data;
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
export default BiddersStockData;
