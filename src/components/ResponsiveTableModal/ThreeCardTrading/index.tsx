import { Card, Col, Modal, Row } from "antd";
import { AiFillStar } from "react-icons/ai";
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import StockClosingPrice from "../../StockFields/StockClosingPrice";
import ChangePercentage from "../../StockFields/ThreeCardTrading/ChangePercentage";
import StockPoints from "../../StockFields/ThreeCardTrading/StockPoints";

function ThreeCardTradingResponsiveTable(props:any) {
  return (
         <Modal
         title="Stocks"
         visible={props?.isModalVisible}
         onOk={() => {
            props?.setIsModalVisible(false);
            props?.setStocksRecord([]);
         }}
         onCancel={() => {
            props?.setIsModalVisible(false);
            props?.setStocksRecord([]);
         }}
       >
         {props?.stocksRecord &&
           props?.stocksRecord?.map((stock: any, index: any) => {
             return (
               <>
                 <Card
                   key={index}
                   bodyStyle={{ padding: 0 }}
                   className="mt-3"
                 >
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
                       {props?.statusPending === "Pending" ? (
                         <>N/A</>
                       ) : (
                         <StockClosingPrice
                           item={stock.bid_stock_close_price}
                           symbol={stock.stock_symbol}
                           bidDate={props?.bidDate}
                         />
                       )}
                     </Col>
                   </Row>
                   <Row className="m-2">
                     <Col className="fw-bold"> Stock Movement: </Col>
                     <Col className="ms-2">
                       {props?.statusPending === "Pending" ? (
                         <strong>N/A</strong>
                       ) : (
                         <ChangePercentage
                           record={stock}
                           bidDate={props?.bidDate}
                         />
                       )}
                     </Col>
                   </Row>
                   <Row className="m-2">
                     <Col className="fw-bold"> Points: </Col>
                     <Col className="ms-2">
                       {props?.statusPending === "Pending" ? (
                         <strong>N/A</strong>
                       ) : (
                         <StockPoints record={stock} bidDate={props?.bidDate} />
                       )}
                     </Col>
                   </Row>
                            
                               {props?.StockRecord?.bid_stock.map((stock: any, index: any) => {
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
                                  {props?.statusPending === "Pending" ? (
                                    <>N/A</>
                                  ) : (
                                    <StockClosingPrice
                                      item={stock.bid_stock_close_price}
                                      symbol={stock.stock_symbol}
                                      bidDate={props?.bidDate}
                                    />
                                  )}
                                </Col>
                              </Row>
                              <Row className="m-2">
                                <Col className="fw-bold"> Stock Movement: </Col>
                                <Col className="ms-2">
                                  {props?.statusPending === "Pending" ? (
                                    <strong>N/A</strong>
                                  ) : (
                                    <ChangePercentage
                                      record={stock}
                                      bidDate={props?.bidDate}
                                    />
                                  )}
                                </Col>
                              </Row>
                              <Row className="m-2">
                                <Col className="fw-bold"> Points: </Col>
                                <Col className="ms-2">
                                  {props?.statusPending === "Pending" ? (
                                    <strong>N/A</strong>
                                  ) : (
                                    <StockPoints
                                      record={stock}
                                      bidDate={props?.bidDate}
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
    )
}

export default ThreeCardTradingResponsiveTable;
