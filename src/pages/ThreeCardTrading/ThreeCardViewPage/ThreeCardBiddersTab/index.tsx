import { Tooltip, message, Modal, Card, Row, Col } from "antd";
import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { useParams } from "react-router";
import CRUDDataTable from "../../../../components/DataTable/dataTable";
import BiddersStockData from "./BiddersStocks";
import { getThreeCardBidders } from "../../../../api/threeCardTrading";
import { Link } from "react-router-dom";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
  BsFillEyeFill,
  BsHash,
} from "react-icons/bs";
import TotalEarnedPoints from "../../../../components/StockFields/ThreeCardTrading/TotalEarnedPoints";
import { useState } from "react";
import StockClosingPrice from "../../../../components/StockFields/StockClosingPrice";
import ChangePercentage from "../../../../components/StockFields/ThreeCardTrading/ChangePercentage";
import StockPoints from "../../../../components/StockFields/ThreeCardTrading/StockPoints";

const ThreeCardBiddersTab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stocksRecord, setStocksRecord] = useState<any>([]);
  const [statusPending, setStatusPending] = useState("");
  const [bidDate, setBidDate] = useState();


  const id: any = useParams();
  const draw = 0;

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
      sorter: true,
      width: "15%",
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
        return <>{record?.bid_status?.name}</>;
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
    },
    // },
  ];

  const fetchThreeCardBidders = async (params: any) => {
    try {
      params = {
        ...params,
      };
      return await getThreeCardBidders(id.id, params);
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <>
      <CRUDDataTable
        draw={draw}
        entity="Bidders"
        fetchDataFunction={fetchThreeCardBidders}
        expandable={{
          expandedRowRender: (record: any) => (
            <>
              <BiddersStockData
                data={record?.bid_stock}
                bidDate={record?.for_bid_date}
                bidStatus={record?.bid_status?.name}
              />
            </>
          ),
          expandIcon: ({ expanded, onExpand, record }: any) =>
            expanded ? (
              <>
                <AiOutlineMinusSquare onClick={(e) => onExpand(record, e)} />
              </>
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
        //  <ThreeCardTradingResponsiveTable isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
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
    </>
  );
};

export default ThreeCardBiddersTab;
