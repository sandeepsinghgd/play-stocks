import { Tag, Tooltip, message, Modal, Card, Row, Col } from "antd";
import { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { useParams } from "react-router";
import { getThreeCardResults } from "../../../../api/threeCardTrading";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import "../../../../styles/threeCardResult.scss";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsHash } from "react-icons/bs";
import ResultData from "./ResultData";
import TotalEarnedPoints from "../../../../components/StockFields/ThreeCardTrading/TotalEarnedPoints";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import ChangePercentage from "../../../../components/StockFields/ThreeCardTrading/ChangePercentage";
import StockPoints from "../../../../components/StockFields/ThreeCardTrading/StockPoints";

const ThreeCardResultsTab = () => {
  const [draw, setDraw] = useState(0); //eslint-disable-line
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stocksRecord, setStocksRecord] = useState<any>([]);
  const [statusPending, setStatusPending] = useState("");
  const [bidDate, setBidDate] = useState();
  const id: any = useParams();

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
      title: <strong>Result</strong>,
      dataIndex: "result",
      key: "result",
      sorter: true,
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
      title: <strong>Stock Details</strong>,
      dataIndex: "bid_stock",
      key: "bid_stock",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            <BsFillEyeFill
              onClick={() => {
                setStocksRecord(record.bids);
                setIsModalVisible(true);
                // setUserPermissions(record.permissions);
                record.forEach((stockRecord: any) => {
                  setBidDate(stockRecord.for_bid_date);
                  stockRecord.forEach((record: any) => {
                    setStatusPending(record?.stock_status);
                  });
                });
              }}
            />
          </>
        );
      },
      responsive: ["xs"],
    },
    // {
    //   title: <strong>View Results</strong>,
    //   dataIndex: "permissions",
    //   key: "permissions",
    //   render: (text: any, record: any, value: any) => {
    //     return (
    //       <>
    //         <BsFillEyeFill
    //           onClick={() => {
    //             // setUserPermissions(record.permissions);
    //             setStocksRecord(record);
    //             setIsModalVisible(true);
    //           }}
    //         />
    //       </>
    //     );
    //   },
    //   responsive: ["xs"],
    // },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <Tag color="#0A3453">
            {record?.winning_amount == 0.0 ? "N/A" : record?.winning_amount}
          </Tag>
        );
      },
    },
  ];

  const fetchThreeCardResults = async (params: any) => {
    try {
      params = {
        ...params,
      };
      const resp = await getThreeCardResults(id.id, params);
      return resp;
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Results"
        fetchDataFunction={fetchThreeCardResults}
        expandable={{
          expandedRowRender: (record: any) => (
            <ResultData data={record?.bids} />
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
        isCreateModalVisible={isModalVisible}
        setCreateModalVisibility={setIsModalVisible}
        createModal={
        //    <ThreeCardTradingResponsiveTable isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
        //  setStocksRecord={setStocksRecord}
        //  stocksRecord={stocksRecord}
        //  statusPending={statusPending}
        //  bidDate={bidDate}
        //  />
          <Modal
            title="Result"
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
              stocksRecord?.map((StockRecord: any, index: any) => {
                return (
                  <>
                    <Card
                      key={index}
                      bodyStyle={{ padding: 0 }}
                      className="mt-3"
                    >
                      <Row className="m-2">
                        <Col className="fw-bold"> Name: </Col>
                        <Col className="ms-2">
                          {StockRecord.user_name
                            ? StockRecord.user_name
                            : "N/A"}
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col className="fw-bold"> Created At: </Col>
                        <Col className="ms-2">
                          {" "}
                          {StockRecord.created_at
                            ? StockRecord.created_at
                            : "N/A"}
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col className="fw-bold"> Bid Date: </Col>
                        <Col className="ms-2">
                          {StockRecord.for_bid_date
                            ? StockRecord.for_bid_date
                            : "N/A"}
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col className="fw-bold"> Bid Amount: </Col>
                        <Col className="ms-2">N/A</Col>
                      </Row>
                      <Row className="m-2">
                        <Col className="fw-bold"> Result: </Col>
                        <Col className="ms-2">
                          {StockRecord.result ? StockRecord.result : "N/A"}
                        </Col>
                      </Row>
                      <Row className="m-2">
                        <Col className="fw-bold"> Earned Points: </Col>
                        <Col className="ms-2">
                          <TotalEarnedPoints
                            record={StockRecord}
                            bidDate={StockRecord?.for_bid_date}
                          />
                        </Col>
                      </Row>

                      {StockRecord?.bid_stock.map((stock: any, index: any) => {
                        return (
                          <>
                            <Card>
                              <Row className="m-2">
                                <Col className="fw-bold"> Name: </Col>
                                <Col className="ms-2">
                                  {stock.stock_name ? stock.stock_name : "N/A"}
                                </Col>
                              </Row>
                              <Row className="m-2">
                                <Col className="fw-bold"> Stock Price: </Col>
                                <Col className="ms-2">
                                  {stock.bid_stock_price
                                    ? stock.bid_stock_price
                                    : "N/A"}
                                </Col>
                              </Row>
                              <Row className="m-2">
                                <Col className="fw-bold"> Bid Amount: </Col>
                                <Col className="ms-2">
                                  {stock.bid_amount ? stock.bid_amount : "N/A"}
                                </Col>
                              </Row>
                              <Row className="m-2">
                                <Col className="fw-bold">
                                  {" "}
                                  Stock Closing Price:{" "}
                                </Col>
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
                                    <ChangePercentage
                                      record={stock}
                                      bidDate={bidDate}
                                    />
                                  )}
                                </Col>
                              </Row>
                              <Row className="m-2">
                                <Col className="fw-bold"> Points: </Col>
                                <Col className="ms-2">
                                  {statusPending === "Pending" ? (
                                    <strong>N/A</strong>
                                  ) : (
                                    <StockPoints
                                      record={stock}
                                      bidDate={bidDate}
                                    />
                                  )}
                                </Col>
                              </Row>
                            </Card>
                          </>
                        );
                      })}
                    </Card>
                  </>
                );
              })}
          </Modal>
        }
      />
    </>
  );
};

export default ThreeCardResultsTab;
