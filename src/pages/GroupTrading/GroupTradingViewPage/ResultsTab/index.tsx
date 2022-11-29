import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getResults } from "../../../../api/groupDetailPage";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import GroupTradeResponsivetableModal from "../../../../components/ResponsiveTableModal/GroupTrading";
import TotalEarnedPoints from "../../../../components/StockFields/GroupTrading/TotalEarnedPoints";
import { useTypedSelector } from "../../../../hooks/useTypeSelector";
import ResultStockData from "./ResultStockData";

const ResultsTab = ({ minPlayer }: any) => {
  const id: any = useParams();
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [extraBidStockId, setExtrabidStockId] = useState(false);
  const [statusPending, setStatusPending] = useState(false);
  const [stocksRecord, setStocksRecord] = useState([]);
  const [bidDate, setBidDate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlayerSufficient, setIsPlayerSufficient] = useState(false);
  const [groupBidDate, setGroupBidDate] = useState("");
  const groupStatus = "Disqualified";
  const { marketPrevOpenDate, marketStatus } = useTypedSelector(
    (state: any) => state?.marketDates
  );

  useEffect(() => {
    if (groupBidDate === marketPrevOpenDate && isPlayerSufficient === true) {
      if (marketStatus === "open") {
        setExtrabidStockId(true);
      }
    }
  }, [groupBidDate, marketPrevOpenDate, extraBidStockId, marketStatus]);

  const columns = [
    {
      title: <strong>Rank</strong>,
      dataIndex: "rank",
      key: "rank",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.rank == 0 || record?.rank == null ? "N/A" : record?.rank;
      },
    },
    {
      title: <strong>Name</strong>,
      dataIndex: "user_name",
      key: "user_name",
      width: "20%",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        setGroupBidDate(record?.for_bid_date);
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
      sorter: true,
      render: (text: any, record: any, value: any) => {
        let initials, timestamp;
        if (record?.created_at !== null) {
          initials = record.created_at.replace(/T/g, " | ");
          timestamp = initials.replace(/.000000Z/g, "");
        } else {
          initials = "";
        }
        return <>{timestamp}</>;
      },
    },
    {
      title: <strong>Result Date</strong>,
      dataIndex: "result_at",
      key: "result_at",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.result_at == "" ? "N/A" : record?.result_at;
      },
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.winning_amount == 0.0 || record?.winning_amount == null
          ? "N/A"
          : record?.winning_amount;
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
  const fetchResultData = async (params: any) => {
    params = {
      ...params,
    };
    const resp = await getResults(id.id, params);
    if (resp?.data?.result?.data.length < minPlayer) {
      setIsPlayerSufficient(true);
    }
    return resp;
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Results"
        fetchDataFunction={fetchResultData}
        expandable={{
          expandedRowRender: (record: any) => (
            <ResultStockData
              data={record?.bid_stock}
              bidDate={record.for_bid_date}
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
        sortOrder="rank"
        isButtonShown={false}
        rowKey="id"
        direction="asc"
        groupQualifyStatus={extraBidStockId}
        groupStatus={groupStatus}
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
};

export default ResultsTab;
