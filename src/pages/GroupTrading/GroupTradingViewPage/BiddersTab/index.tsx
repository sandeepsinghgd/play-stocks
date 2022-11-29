import { message, Tooltip } from "antd";
import { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsFillEyeFill, BsHash } from "react-icons/bs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getBidders } from "../../../../api/groupDetailPage";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import GroupTradeResponsivetableModal from "../../../../components/ResponsiveTableModal/GroupTrading";
import TotalEarnedPoints from "../../../../components/StockFields/GroupTrading/TotalEarnedPoints";
import BiddersStockData from "./BiddersStockData";

function BiddersTab() {
  const id: any = useParams();
  const [draw, setDraw] = useState(0); // eslint-disable-line
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusPending, setStatusPending] = useState(false);
  const [stocksRecord, setStocksRecord] = useState([]);
  const [bidDate, setBidDate] = useState();

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
      title: <strong>Name</strong>,
      dataIndex: "user_name",
      key: "user_name",
      width: "15%",
      sorter: true,
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
      width: "15%",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        let initials, timestamp;
        if (record?.created_at !== null) {
          initials = record?.created_at.replace(/T/g, " | ");
          timestamp = initials.replace(/.000000Z/g, "");
        } else {
          initials = "";
        }
        return <>{timestamp}</>;
      },
    },
    {
      title: <strong>Result Date</strong>,
      dataIndex: "for_bid_date",
      key: "for_bid_date",
      sorter: true,
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "bid_status",
      key: "bid_status",
      render: (text: any, record: any, value: any) => {
        if (record.is_status_pending === true) {
          return <>Pending</>;
        } else {
          return <>{record?.bid_status?.name}</>;
        }
      },
    },
    {
      title: <strong>Rank</strong>,
      dataIndex: "rank",
      key: "rank",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.rank == 0 || record?.rank == "" ? "N/A" : record?.rank;
      },
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.winning_amount == 0.0 || record?.winning_amount == "" ? (
              <>N/A</>
            ) : (
              record?.winning_amount
            )}
          </>
        );
      },
    },
    {
      title: <strong>Stock Details</strong>,
      dataIndex: "bid_stock",
      key: "bid_stock",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            <BsFillEyeFill
              onClick={() => {
                // setUserPermissions(record.permissions);
                setBidDate(record.for_bid_date);
                setStatusPending(record.is_status_pending);
                setStocksRecord(record.bid_stock);
                setIsModalVisible(true);
              }}
            />
          </>
        );
      },
      responsive: ["xs"],
    },
    {
      title: <strong>Earned Points</strong>,
      dataIndex: "points",
      key: "points",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <TotalEarnedPoints record={record} bidDate={record?.for_bid_date} />
        );
      },
    },
    // },
  ];
  const fetchGroupData = async (params: any) => {
    try {
      params = {
        ...params,
      };
      const resp = await getBidders(id.id, params);
      return resp;
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Bidders"
        fetchDataFunction={fetchGroupData}
        expandable={{
          expandedRowRender: (record: any) => (
            <BiddersStockData
              data={record?.bid_stock}
              bidDate={record.for_bid_date}
              isStatusPending={record.is_status_pending}
            />
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
        isButtonShown={false}
        rowKey="id"
        sortOrder="created_at"
        isCreateModalVisible={isModalVisible}
        setCreateModalVisibility={setIsModalVisible}
        createModal={
          <GroupTradeResponsivetableModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setStocksRecord={setStocksRecord}
            stocksRecord={stocksRecord}
            statusPending={statusPending}
            bidDate={bidDate}
          />
        }
      />
    </>
  );
}

export default BiddersTab;
