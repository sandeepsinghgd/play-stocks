import { Card, Col, message, Modal, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
  BsFillEyeFill,
  BsHash,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { setStocks } from "../../../../api/stocks";
import { getCustomerThreeCardData } from "../../../../api/threeCardTrading";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import ChangePercentage from "../../../../components/StockFields/ThreeCardTrading/ChangePercentage";
import StockPoints from "../../../../components/StockFields/ThreeCardTrading/StockPoints";
import TotalEarnedPoints from "../../../../components/StockFields/ThreeCardTrading/TotalEarnedPoints";
import { get3CardBiddersLiveData } from "../../../../redux/actions/liveStocksData";
import ThreeCardStockData from "./ThreeCardStockData";

const ThreeCardTab = () => {
  const id: any = useParams();
  const [draw, setDraw] = useState(0); // eslint-disable-line

  let interval: any = null;
  const secretKey = localStorage.getItem("secretKey");
  const dispatch = useDispatch();
  const [stockSymbols, setStockSymbols] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stocksRecord, setStocksRecord] = useState<any>([]);
  const [statusPending, setStatusPending] = useState("");
  const [bidDate, setBidDate] = useState();

  useEffect(() => {
    getThreeCardStocks();
  }, []);

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
      dispatch(get3CardBiddersLiveData(JSON.parse(data)));
    };
  };

  const getThreeCardStocks = async () => {
    const response = await setStocks(2);
    const res = response.data.result;
    setStockSymbols(res);
    connect(res);
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
              pathname: `/trading/50-50-trading/${record?.group_id}`,
              state: { fromDashboard: false },
            }}
          >
            <span style={{ fontWeight: "bold", color: "#0A3453" }}>
              {record?.group_name}
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
        return record.bid_status.name ? record.bid_status.name : "N/A";
      },
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return record?.winning_amount == 0.0 ? (
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
                setStatusPending(record?.bid_status?.name);
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
  ];

  const fetchThreeCardList = async (params: any) => {
    try {
      params = {
        ...params,
      };
      const response = await getCustomerThreeCardData(id.id, params);
      const result = response?.data?.result;
      return result;
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };
  return (
    <CRUDDataTable
      fetchDataFunction={fetchThreeCardList}
      expandable={{
        expandedRowRender: (record: any) => (
          <ThreeCardStockData
            data={record.bid_stock}
            bidDate={record?.for_bid_date}
            isStatusPending={record.bid_status.name}
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
      entity="50/50 Trading Data"
      columns={columns}
      sortOrder="id"
      isButtonShown={false}
      rowKey="index"
      isCreateModalVisible={isModalVisible}
      setCreateModalVisibility={setIsModalVisible}
      createModal={
        // <ThreeCardTradingResponsiveTable isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
        //  setStocksRecord={setStocksRecord}
        //  stocksRecord={stocksRecord}
        //  statusPending={statusPending}
        //  bidDate={bidDate}
        //  />
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
                        )}{" "}
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
                        {statusPending === "Pending" ? (
                          <>N/A</>
                        ) : (
                          <StockClosingPrice
                            item={stock.bid_stock_close_price}
                            symbol={stock.stock_symbol}
                            bidDate={bidDate}
                          />
                        )}
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Stock Movement: </Col>
                      <Col className="ms-2">
                        {statusPending === "Pending" ? (
                          <strong>N/A</strong>
                        ) : (
                          <ChangePercentage record={stock} bidDate={bidDate} />
                        )}
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col className="fw-bold"> Earned Points: </Col>
                      <Col className="ms-2">
                        {statusPending === "Pending" ? (
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
export default ThreeCardTab;
