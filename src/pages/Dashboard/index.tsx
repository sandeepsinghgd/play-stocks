import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import "../../styles/_dashboard.scss";
import { dbAuthData } from "../../redux/actions/dbstockList";
import { useDispatch } from "react-redux";
import PieChartComp from "../../components/controls/PieChart";
import ChartBar from "./Charts/ChartBar";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineGroupWork } from "react-icons/md";
import WalletTransection from "./TransectionList/walletTransection";
import { getDashboard } from "../../api/dashboard";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypeSelector";

const ReusableCard = ({
  title,
  iconProp,
  statisticData,
  link,
  permissions,
}: any) => {
  return (
    <div>
      {permissions ? (
        <Link to={link}>
          <Card className="contestsCard rounded-[10px]">
            <div className="flex justify-between w-full">
              <div className="flex items-center justify-center flex-row rounded bg-[#0A3453] w-[60px] h-[60px]">
                <div className="text-3xl text-white"> {iconProp}</div>
              </div>
              <div className="flex items-center">
                <strong>
                  <p
                    className="text-lg lg:text-2xl desktop:text-[32px]"
                    style={{ color: "rgb(0 0 0 / 79%)" }}
                  >
                    {statisticData}
                  </p>
                </strong>
              </div>
            </div>

            <div className="pl-0 mt-2.5">
              <p className="m-0 p-0 text-xs lg:text-sm desktop:text-lg font-normal">
                {title}
              </p>
            </div>
          </Card>
        </Link>
      ) : (
        <Card className="contestsCard rounded-[10px]">
          <div className="flex justify-between w-full">
            <div className="flex items-center justify-center flex-row rounded bg-[#0A3453] w-[60px] h-[60px]">
              <div className="text-3xl text-white"> {iconProp}</div>
            </div>
            <div className="flex items-center">
              <strong>
                <p
                  className="text-lg lg:text-2xl desktop:text-[32px]"
                  style={{ color: "rgb(0 0 0 / 79%)" }}
                >
                  {statisticData}
                </p>
              </strong>
            </div>
          </div>

          <div className="pl-0 mt-2.5">
            <p className="m-0 p-0 text-xs lg:text-sm desktop:text-lg font-normal">
              {title}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

const DashboardPage: FC = () => {
  // const dbStockList = useTypedSelector<any>((state) => state.dbData);
  // const AuthData = useTypedSelector<any>((state) => state.dbData);
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState({
    active_customers: null,
    entry_fees_collected: null,
    group_contests: null,
    inactive_customers: null,
    price_distributed: null,
    three_card_contests: null,
    total_commission: null,
  });

  const { currentUserPermissionModules } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const getApiData = async () => {
      const dashboardRes: any = await getDashboard({});
      setDashboard(dashboardRes?.data?.result);
      dispatch(dbAuthData(dashboardRes?.data?.result));
    };
    getApiData();
  }, []);

  const GroupTradCol = [
    {
      title: <strong>Contest</strong>,
      dataIndex: "amount",
      key: "amount",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.amount === null ||
            record?.amount === "" ||
            record?.amount === 0
              ? "N/A"
              : record?.amount}
          </>
        );
      },
    },
    {
      title: <strong>Players</strong>,
      dataIndex: "total_players",
      key: "total_players",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_players === null ||
            record?.total_players === "" ||
            record?.total_players === 0
              ? "N/A"
              : record?.total_players}
          </>
        );
      },
    },
    {
      title: <strong>Trades</strong>,
      dataIndex: "total_stocks",
      key: "total_stocks",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_stocks === null ||
            record?.total_stocks === "" ||
            record?.total_stocks === 0
              ? "N/A"
              : record?.total_stocks}
          </>
        );
      },
    },
    {
      title: <strong>Collection</strong>,
      dataIndex: "total_collections",
      key: "total_collections",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_collections === null ||
            record?.total_collections === "" ||
            record?.total_collections === 0
              ? "N/A"
              : record?.total_collections}
          </>
        );
      },
    },
    {
      title: <strong>Earnings</strong>,
      dataIndex: "total_earnings",
      key: "total_earnings",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_earnings === null ||
            record?.total_earnings === "" ||
            record?.total_earnings === 0
              ? "N/A"
              : record?.total_earnings}
          </>
        );
      },
    },
  ];

  const fiftyFiftyTradeCol = [
    {
      title: <strong>Contest</strong>,
      dataIndex: "amount",
      key: "amount",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.amount === null ||
            record?.amount === "" ||
            record?.amount === 0
              ? "N/A"
              : record?.amount}
          </>
        );
      },
    },
    {
      title: <strong>Players</strong>,
      dataIndex: "total_players",
      key: "total_players",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_players === null ||
            record?.total_players === "" ||
            record?.total_players === 0
              ? "N/A"
              : record?.total_players}
          </>
        );
      },
    },
    {
      title: <strong>Collection</strong>,
      dataIndex: "total_collections",
      key: "total_collections",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_collections === null ||
            record?.total_collections === "" ||
            record?.total_collections === 0
              ? "N/A"
              : record?.total_collections}
          </>
        );
      },
    },
    {
      title: <strong>Earnings</strong>,
      dataIndex: "total_earnings",
      key: "total_earnings",
      // sorter: true,
      width: "30%",
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.total_earnings === null ||
            record?.total_earnings === "" ||
            record?.total_earnings === 0
              ? "N/A"
              : record?.total_earnings}
          </>
        );
      },
    },
  ];

  const GroupTradWinnerCol = [
    {
      title: <strong>Customer</strong>,
      dataIndex: "customer",
      key: "customer",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.customer === null ||
            record?.customer === "" ||
            record?.customer === 0
              ? "N/A"
              : record?.customer}
          </>
        );
      },
    },
    {
      title: <strong>Contest</strong>,
      dataIndex: "amount",
      key: "amount",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.amount === null ||
            record?.amount === "" ||
            record?.amount === 0
              ? "N/A"
              : record?.amount}
          </>
        );
      },
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      // sorter: true,
      width: 110,
      ellipsis: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.winning_amount === null ||
            record?.winning_amount === "" ||
            record?.winning_amount === 0
              ? "N/A"
              : record?.winning_amount}
          </>
        );
      },
    },
  ];

  const fiftyFiftyTradeWinCol = [
    {
      title: <strong>Customer</strong>,
      dataIndex: "customer",
      key: "customer",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.customer === null ||
            record?.customer === "" ||
            record?.customer === 0
              ? "N/A"
              : record?.customer}
          </>
        );
      },
    },
    {
      title: <strong>Contest</strong>,
      dataIndex: "amount",
      key: "amount",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.amount === null ||
            record?.amount === "" ||
            record?.amount === 0
              ? "N/A"
              : record?.amount}
          </>
        );
      },
    },
    {
      title: <strong>Prize Amount</strong>,
      dataIndex: "winning_amount",
      key: "winning_amount",
      // sorter: true,
      width: 110,
      ellipsis: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.winning_amount === null ||
            record?.winning_amount === "" ||
            record?.winning_amount === 0
              ? "N/A"
              : record?.winning_amount}
          </>
        );
      },
    },
  ];

  const TopTenStockCol = [
    {
      title: <strong>UP-Stocks</strong>,
      dataIndex: "upStocks",
      key: "upStocks",
      // sorter: true,
      width: 110,
      ellipsis: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.upStocks?.stock_symbol === null ||
            record?.upStocks?.stock_symbol === "" ||
            record?.upStocks?.stock_symbol === 0
              ? "N/A"
              : record?.upStocks?.stock_symbol}
          </>
        );
      },
    },
    {
      title: <strong>Trades</strong>,
      dataIndex: "total_trades",
      key: "total_trades",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.upStocks?.total_trades === null ||
            record?.upStocks?.total_trades === "" ||
            record?.upStocks?.total_trades === 0
              ? "N/A"
              : record?.upStocks?.total_trades}
          </>
        );
      },
    },
    {
      title: <strong>DOWN-Stocks</strong>,
      dataIndex: "downStocks",
      key: "downStocks",
      // sorter: true,
      width: 110,
      ellipsis: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.downStocks?.stock_symbol === null ||
            record?.downStocks?.stock_symbol === "" ||
            record?.downStocks?.stock_symbol === 0
              ? "N/A"
              : record?.downStocks?.stock_symbol}
          </>
        );
      },
    },
    {
      title: <strong>Trades</strong>,
      dataIndex: "total_trades",
      key: "total_trades",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.downStocks?.total_trades === null ||
            record?.downStocks?.total_trades === "" ||
            record?.downStocks?.total_trades === 0
              ? "N/A"
              : record?.downStocks?.total_trades}
          </>
        );
      },
    },
  ];

  const LatestTransactionCol = [
    {
      title: <strong>Id</strong>,
      dataIndex: "index",
      key: "index",
      // sorter: true,
      // render: (text: any, record: any, value: any) => {
      //   return <>{record?.id === null || record?.id === "" || record?.id === 0 ? "N/A" : record?.id}</>
      // },
    },
    {
      title: <strong>Customer</strong>,
      dataIndex: "user_name",
      key: "user_name",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.user_name === null ||
            record?.user_name === "" ||
            record?.user_name === 0
              ? "N/A"
              : record?.user_name}
          </>
        );
      },
    },
    {
      title: <strong>Amount</strong>,
      dataIndex: "amount",
      key: "amount",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.amount === null ||
            record?.amount === "" ||
            record?.amount === 0
              ? "N/A"
              : record?.amount}
          </>
        );
      },
    },
    {
      title: <strong>Trade</strong>,
      dataIndex: "trade_type",
      key: "trade_type",
      // sorter: true,
      width: 110,
      ellipsis: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.trade_type === null ||
            record?.trade_type === "" ||
            record?.trade_type === 0
              ? "N/A"
              : record?.trade_type}
          </>
        );
      },
    },
    {
      title: <strong>Type</strong>,
      dataIndex: "type",
      key: "type",
      // sorter: true,
      render: (text: any, record: any, value: any) => {
        return (
          <>
            {record?.type === null || record?.type === "" || record?.type === 0
              ? "N/A"
              : record?.type}
          </>
        );
      },
    },
  ];

  return (
    <div className="dashboardContainer">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3">
          <WalletTransection
            title="Group Trading Today"
            searchBox={true}
            column={GroupTradCol}
            type="todayGroupTrading"
            rightArrowLink={
              currentUserPermissionModules.includes("Group Trading")              
            }
            link="/trading/group-trading"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3">
          <WalletTransection
            title="50/50 Trading Today"
            searchBox={true}
            column={fiftyFiftyTradeCol}
            type="todayFiftyFiftyTrading"
            rightArrowLink={
              currentUserPermissionModules.includes("50/50 Trading")
            }
            link="/trading/50-50-trading"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3">
          <WalletTransection
            title="Top 10 Stocks Traded Today"
            searchBox={true}
            column={TopTenStockCol}
            type="topTenStocksTrade"
            rightArrowLink={currentUserPermissionModules.includes(
              "Stocks Analysis Report"
            )}
            link="/reports/stock-analysis"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3">
          <WalletTransection
            title="Group Trading Winners"
            searchBox={true}
            column={GroupTradWinnerCol}
            type="groupTradingWinners"
            rightArrowLink={currentUserPermissionModules.includes(
              "Winner Losers Report"
            )}
            link="/reports/winners-losers"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3">
          <WalletTransection
            title="50/50 Trading Winners"
            searchBox={true}
            column={fiftyFiftyTradeWinCol}
            type="fiftyFiftyTradingWinners"
            rightArrowLink={currentUserPermissionModules.includes(
              "Winner Losers Report"
            )}
            link="/reports/winners-losers"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3 latestTransaction">
          <WalletTransection
            title="Latest Transactions"
            searchBox={true}
            column={LatestTransactionCol}
            type="latestTransactions"
            rightArrowLink={currentUserPermissionModules.includes(
              "Transaction History"
            )}
            link="/trading/transaction-history"
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={16} className="mt-3">
          <ChartBar title="Amount Statistics- YTD" />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} className="mt-3">
          <PieChartComp />
        </Col>
      </Row>
      <Row gutter={[8, 8]} className="mt-3">
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard?.active_customers}
            title={"Customers"}
            iconProp={<IoIosPeople />}
            link="/customers"
            permissions={
              currentUserPermissionModules.includes("Customer") 
            }
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard.inactive_customers}
            title={"Inactive Customers"}
            iconProp={<MdOutlineGroupWork />}
            link="/customers"
            permissions={
              currentUserPermissionModules.includes("Customer") 
            }
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard.group_contests}
            title={"Group Trading Contests"}
            iconProp={<IoIosPeople />}
            link="/trading/group-trading"
            permissions={
              currentUserPermissionModules.includes("Group Trading")
            }
          />{" "}
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard.three_card_contests}
            title={"50/50 Trading Contests"}
            iconProp={<IoIosPeople />}
            link="/trading/50-50-trading"
            permissions={
              currentUserPermissionModules.includes("50/50 Trading") 
            }
          />{" "}
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard.entry_fees_collected}
            title={"Entry Fee Collected"}
            iconProp={<IoIosPeople />}
            link="/reports/earnings"
            permissions={currentUserPermissionModules.includes(
              "Earnings Report"
            )}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard.price_distributed}
            title={"Prize Amount Distributed"}
            iconProp={<MdOutlineGroupWork />}
            link="/reports/earnings"
            permissions={currentUserPermissionModules.includes(
              "Earnings Report"
            )}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <ReusableCard
            statisticData={dashboard.total_commission}
            title={"Commission Till Date"}
            iconProp={<MdOutlineGroupWork />}
            link="/reports/earnings"
            permissions={currentUserPermissionModules.includes(
              "Earnings Report"
            )}
          />{" "}
        </Col>
      </Row>
    </div>
  );
};
export default DashboardPage;
