import { Tag, Tooltip } from "antd";
import { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import TotalEarnedPoints from "../../../../components/StockFields/ThreeCardTrading/TotalEarnedPoints";
import ThreeCardBiddersStockData from "./ThreeCardBiddersStockData";

const ResultData = ({ data }: any) => {
  const [draw, setDraw] = useState(0); //eslint-disable-line

  const columns = [
    {
      title: <strong>Name</strong>,
      dataIndex: "user_name",
      key: "user_name",
      render: (text: any, record: any, value: any) => {
        return (
          <Link
            to={{
              pathname: `/customers/${record?.user_id}`,
              state: { fromDashboard: false },
            }}
          >
            <span style={{ fontWeight: "bold", color: "#0A3453" }}>
              {record?.user_name}
            </span>
          </Link>
        );
      },
    },
    {
      title: <strong>Created At</strong>,
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: <strong>Result Date</strong>,
      dataIndex: "for_bid_date",
      key: "for_bid_date",
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      render: (text: any, record: any, value: any) => {
        return record?.winning_amount == 0.0 ? (
          <>N/A</>
        ) : (
          record?.winning_amount
        );
      },
    },
    {
      title: <strong>Result</strong>,
      dataIndex: "result",
      key: "result",
      render: (text: any, record: any, value: any) => {
        switch (record?.result) {
          case 1: {
            return (
              <>
                <Tag color="#009900">Winner</Tag>
              </>
            );
          }
          case 2:
            return <Tag color="#e60000">Loser</Tag>;
          case null:
          case "":
            return <>N/A</>;
          default:
            return record?.result;
        }
      },
    },
    {
      title: <strong>Earned Points</strong>,
      dataIndex: "points",
      key: "points",
      render: (text: any, record: any, value: any) => {
        return (
          <TotalEarnedPoints record={record} bidDate={record?.for_bid_date} />
        );
      },
    },
    // },
  ];
  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Bidders"
        fetchDataFunction={async () => {
          return data;
        }}
        expandable={{
          expandedRowRender: (record: any) => (
            <ThreeCardBiddersStockData stockData={record?.bid_stock} />
          ),
          expandIcon: ({ expanded, onExpand, record }: any) =>
            expanded ? (
              <AiOutlineMinusSquare onClick={(e) => onExpand(record, e)} />
            ) : (
              <Tooltip placement="top" title="Analysis">
                <AiOutlinePlusSquare onClick={(e) => onExpand(record, e)} />
              </Tooltip>
            ),
        }}
        columns={columns}
        sortOrder="id"
        isButtonShown={false}
        rowKey="id"
        frequentUpdate={true}
      />
    </>
  );
};
export default ResultData;
