import { FC } from "react";
import { AiFillStar } from "react-icons/ai";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import ChangePercentage from "../../../../components/StockFields/ChangePercentage";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import StockPoints from "../../../../components/StockFields/GroupTrading/StockPoints";
interface ResultStockDataProps {
  data?: any;
  bidDate?: any;
  isStatusPending?: any;
}

const ResultStockData: FC<ResultStockDataProps> = ({
  data,
  bidDate,
  isStatusPending,
}: any) => {
  const draw = 0;

  const columns = [
    {
      title: <strong>Stock Name</strong>,
      dataIndex: "stock_symbol",
      key: "stock_symbol",
      render: (text: any, record: any, values: any) => {
        return (
          <div className="d-flex">
            <span>{record.stock_symbol}</span>{" "}
            {record.is_star_performar ? (
              <AiFillStar size={18} className="text-warning" />
            ) : (
              ""
            )}
          </div>
        );
      },
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
      title: <strong> Bid Movement</strong>,
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
        return isStatusPending ? (
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
        return isStatusPending ? (
          <strong>N/A</strong>
        ) : (
          <ChangePercentage record={record} bidDate={bidDate} />
        );
      },
    },
    {
      title: <strong> Points</strong>,
      dataIndex: "points",
      key: "points",
      render: (text: any, record: any, value: any) => {
        return isStatusPending ? (
          <strong>N/A</strong>
        ) : (
          <StockPoints record={record} bidDate={bidDate} />
        );
      },
    },
  ];
  return (
    <div>
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
    </div>
  );
};

export default ResultStockData;
