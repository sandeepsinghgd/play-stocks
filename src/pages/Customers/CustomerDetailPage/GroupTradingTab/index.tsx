import { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import StockData from "./StockData";
import { Tooltip, message, Modal, Col, Row, Card } from "antd";
import { useParams } from "react-router";
import {
  customerGroupTradingData,
  deleteCustomerGroup,
} from "../../../../api/groupTrading";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
  BsFillEyeFill,
  BsHash,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGroupResultLiveData } from "../../../../redux/actions/liveStocksData";
import { getStockList } from "../../../../api/stocks";
import TotalEarnedPoints from "../../../../components/StockFields/GroupTrading/TotalEarnedPoints";
import StockPoints from "../../../../components/StockFields/GroupTrading/StockPoints";
import ChangePercentage from "../../../../components/StockFields/ChangePercentage";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";

const { confirm } = Modal;

const GroupTradingTab = () => {
  const [draw, setDraw] = useState(0);
  const [stockSymbols, setStockSymbols] = useState<any>();
  const param: any = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stocksRecord, setStocksRecord] = useState<any>([]);
  const [statusPending, setStatusPending] = useState(false);
  const [bidDate, setBidDate] = useState();

  let interval: any = null;
  const secretKey = localStorage.getItem("secretKey");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  const connect = function (symbols = null) {
    const availableSymbols = symbols || stockSymbols;

    const wsUrl = encodeURI(
      "wss://kite-api.playstocks.in/stocks?client_id=" + secretKey
    );

    const ws = new WebSocket(wsUrl);

    const strSymbols = availableSymbols.map((item: any) => item).join(",");

    ws.onopen = function () {
      if (interval != null) {
        clearInterval(interval);
      }

      const filters: any = {
        filter: {
          sortBy: "symbol",
          order: "asc",
          search: "",
        },
        symbol: strSymbols,
      };
      interval = setInterval(function () {
        ws.send(JSON.stringify(filters));
      }, 2000);
    };
    ws.onclose = function () {
      if (interval != null) {
        clearInterval(interval);
      }
    };

    ws.onerror = function (e) {
      ws.close();
      connect(strSymbols);
    };

    ws.onmessage = function (stocks) {
      const { data } = stocks;
      dispatch(getGroupResultLiveData(JSON.parse(data)));
    };
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const response = await getStockList(1);
    setStockSymbols(response?.data?.result);
    connect(response?.data?.result);
  };

  const deleteGroup = async (id: any) => {
    try {
      const response = await deleteCustomerGroup(id);
      if (response.data.success) {
        message.success(response.data.message);
        setDraw(draw + 1);
        setDraw(0);
      }
    } catch (err: any) {
      message.error(err);
    }
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
      title: <strong>Group Name</strong>,
      dataIndex: "group_name",
      key: "group_name",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <Link
            to={{
              pathname: `/trading/group-trading/${record?.group_id}`,
              state: { fromDashboard: false },
            }}
          >
            <span style={{ fontWeight: "bold", color: "#0A3453" }}>
              {record?.group_name}{" "}
              {record.is_star_performar ? (
                <AiFillStar size={18} className="text-warning" />
              ) : (
                ""
              )}
            </span>
          </Link>
        );
      },
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "group_amount",
      key: "group_amount",
      sorter: true,
    },
    {
      title: <strong>Created At</strong>,
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
    {
      title: <strong>Result Date</strong>,
      dataIndex: "for_bid_date",
      key: "for_bid_date",
      sorter: true,
    },
    {
      title: <strong>Status</strong>,
      dataIndex: "status",
      key: "status",
      sorter: true,
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
        return record?.winning_amount == 0.0 || record?.winning_amount == "" ? (
          <>N/A</>
        ) : (
          record?.winning_amount
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
      // },
    },
    {
      title: <strong>Action</strong>,
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.is_deletable ? (
              <Tooltip placement="top" title="Delete Analysis">
                <AiFillDelete
                  style={{ color: "red" }}
                  onClick={() => {
                    confirm({
                      title: "Are you sure, you want to delete Group?",
                      onOk: () => {
                        deleteGroup(record?.id);
                      },
                      onCancel: () => {},
                    });
                  }}
                />
              </Tooltip>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const fetchUserGroups = async (params: any) => {
    params = {
      ...params,
    };
    const payload = {
      user_id: parseInt(param.id),
    };
    const resp = await customerGroupTradingData(payload, params);
    return resp;
  };

  return (
    <CRUDDataTable
      fetchDataFunction={fetchUserGroups}
      expandable={{
        expandedRowRender: (record: any) => (
          <StockData
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
      draw={draw}
      entity="Group Trading Data "
      columns={columns}
      sortOrder="created_at"
      isButtonShown={false}
      rowKey="id"
      isCreateModalVisible={isModalVisible}
      setCreateModalVisibility={setIsModalVisible}
      createModal={
        <Modal
          title="Stocks"
          visible={isModalVisible}
          onOk={() => {
            setIsModalVisible(false);
            setStocksRecord([]);
          }}
          onCancel={() => {
            setIsModalVisible(false);
            setStocksRecord([]);
          }}
        >
          {stocksRecord &&
            stocksRecord?.map((stock: any, index: any) => {
              return (
                <>
                  <Card key={index} bodyStyle={{ padding: 0 }} className="mt-3">
                    <Row className="m-2">
                      <Col className="fw-bold"> Stock Name: </Col>
                      <Col className="ms-2">
                        {" "}
                        {stock.stock_symbol}{" "}
                        {stock.is_star_performar ? (
                          <AiFillStar size={18} className="text-warning" />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Stock Price: </Col>
                      <Col className="ms-2"> {stock.bid_stock_price}</Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Bid Movement: </Col>
                      <Col className="ms-2">
                        <>
                          {stock.stock_status === 2 ? (
                            <>
                              {stock.bid_amount} &nbsp;
                              <BsFillArrowDownSquareFill
                                style={{ color: "red" }}
                              />{" "}
                            </>
                          ) : (
                            <>
                              {stock.bid_amount} &nbsp;
                              <BsFillArrowUpSquareFill
                                style={{ color: "green" }}
                              />
                            </>
                          )}{" "}
                        </>
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Stock Closing Price: </Col>
                      <Col className="ms-2">
                        {statusPending ? (
                          <>N/A</>
                        ) : (
                          <StockClosingPrice
                            item={stock.close}
                            symbol={stock.stock_symbol}
                            bidDate={bidDate}
                          />
                        )}
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Stock Movement: </Col>
                      <Col className="ms-2">
                        {statusPending ? (
                          <strong>N/A</strong>
                        ) : (
                          <ChangePercentage record={stock} bidDate={bidDate} />
                        )}
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Earned Points: </Col>
                      <Col className="ms-2">
                        {statusPending ? (
                          <strong>N/A</strong>
                        ) : (
                          <StockPoints record={stock} bidDate={bidDate} />
                        )}
                      </Col>
                    </Row>
                  </Card>
                </>
              );
            })}
        </Modal>
      }
    />
  );
};

export default GroupTradingTab;
