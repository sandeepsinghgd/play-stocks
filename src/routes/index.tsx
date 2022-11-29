import { ReactNode } from "react";
import AdminUsers from "../pages/AdminUsers";
import Customers from "../pages/Customers";
import DashboardPage from "../pages/Dashboard";
import { MdDashboard, MdReceiptLong } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdInformationCircle } from "react-icons/io";
import {
  AiFillSetting,
  AiOutlineArrowRight,
  AiOutlinePullRequest,
  AiOutlineStock,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { FaChartBar, FaUserAlt } from "react-icons/fa";
import GroupTrading from "../pages/GroupTrading";
import VolatileTrading from "../pages/VolatileTrading";
import VirtualTrading from "../pages/VirtualTrading";
import Roles from "../pages/Roles";
import Plans from "../pages/Plans";
import SystemConfiguration from "../pages/SystemConfiguration";
import Inquires from "../pages/Inquires";
import AccountProfile from "../pages/AccountProfile";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CustomerDetailPage from "../pages/Customers/CustomerDetailPage/CustomerDetailPage";
import "../app.scss";
import GroupViewPage from "../pages/GroupTrading/GroupTradingViewPage/GroupViewPage";
import ForgotMpin from "../pages/forgotMpin";
import ThreeCardTrading from "../pages/ThreeCardTrading";
import ThreeCardDetailPage from "../pages/ThreeCardTrading/ThreeCardViewPage/ThreeCardDetailPage";
import CalTabStructure from "../pages/Calendar/CalTabStructure/CalTabStructure";
import ActivityLog from "../pages/Activity Logs/ActivityLog";
import Stocks from "../pages/Stocks";
import { BiBookContent } from "react-icons/bi";
import Cms from "../pages/CMS/Cms";
import PushNotifications from "../pages/PushNotifications";
import TransactionHistory from "../pages/TransactionHistory";
import LogicTable from "../pages/Analysis/LogicTable";
import CreateGroupTrading from "../pages/CreateGroup";
import WithdrawRequests from "../pages/WithdrawRequests";
import Withdrawals from "../pages/Reports/WithDrawals";
import WinnersAndLosers from "../pages/Reports/WinnersAndLosers";
import TotalPlayers from "../pages/Reports/TotalPlayers";
import StockAnalysis from "../pages/Reports/StockAnalysis";
import PlayedContests from "../pages/Reports/PlayedContests";
import Earnings from "../pages/Reports/Earnings";
interface Route {
  key?: number;
  path?: string;
  title?: string;
  className?: string;
  isSubMenu?: boolean;
  isMenuShown?: boolean;
  isSubMenuShown?: boolean;
  breadcrumbName?: string;
  icon?: ReactNode;
  component?: ReactNode;
  components?: Array<any>;
  module?: any;
}
const routes: Route[] = [
  {
    key: 1,
    path: "/dashboard",
    title: "Dashboard",
    className: "dashboard",
    isMenuShown: true,
    isSubMenu: false,
    icon: <MdDashboard />,
    component: <DashboardPage />,
    components: [],
  },
  {
    key: 2,
    title: "Trading",
    path: "/trading",
    isMenuShown: true,
    isSubMenu: true,
    module: ["Group Trading", "50/50 Trading","Transaction History","Withdraw Request"],
    icon: <FaChartBar />,
    components: [
      {
        key: 10,
        path: "/group-trading",
        title: "Group Trading",
        className: "groupTrading",
        isSubMenuShown: true,
        module: "Group Trading",
        component: <GroupTrading />,
      },
      {
        key: 36,
        path: "/create-group-trading",
        title: "Create Group Trading",
        className: "createGroupTrading",
        isSubMenuShown: false,
        module: "Group Trading",
        component: <CreateGroupTrading />,
      },
      {
        key: 26,
        path: "/group-trading/:id",
        title: "Group Data",
        className: "groupDetailPage subMenuVisibility",
        isSubMenuShown: false,
        module: "Group Trading",
        component: <GroupViewPage />,
      },
      {
        key: 28,
        path: "/50-50-trading",
        title: "50/50 Trading",
        className: "threeCardTrading",
        isSubMenuShown: true,
        module: "50/50 Trading",
        component: <ThreeCardTrading />,
      },
      {
        key: 29,
        path: "/50-50-trading/:id",
        title: "50/50 Trading Detail Page",
        className: "threeCardDetailPage",
        isSubMenuShown: false,
        module: "50/50 Trading",
        component: <ThreeCardDetailPage />,
      },
      {
        key: 12,
        path: "/volatile-trading",
        title: "Volatile Trading",
        className: "volatileTrading",
        module: "",
        isSubMenuShown: true,
        component: <VolatileTrading />,
      },
      {
        key: 13,
        path: "/virtual-trading",
        title: "Virtual Trading",
        className: "virtualTrading",
        module: "",
        isSubMenuShown: true,
        component: <VirtualTrading />,
      },
      {
        key: 34,
        path: "/transaction-history",
        title: "Transaction History",
        module: "Transaction History", 
        isSubMenuShown: true,
        className: "transactionHistory",
        icon: <MdReceiptLong />,
        component: <TransactionHistory />,
      },
      {
        key: 27,
        path: "/withdraw-request",
        title: "Withdraw Requests",
        isSubMenuShown: true,
        // isSubMenu: false,
        className: "calendar",
        module: "Withdraw Request", 
        icon: <AiOutlinePullRequest />,
        component: <WithdrawRequests />,
        components: [],
      },
    ],
  },
  {
    key: 3,
    title: "Users",
    path: "/users",
    isMenuShown: true,
    isSubMenu: true,
    breadcrumbName: "Users",
    module: ["User", "Role"],
    icon: <FaUserAlt />,
    components: [
      {
        key: 14,
        path: "/admins",
        title: "Admin Users",
        className: "adminUsers",
        isSubMenuShown: true,
        module: "User",
        component: <AdminUsers />,
      },
      {
        key: 15,
        path: "/roles",
        title: "Roles",
        className: "roles",
        isSubMenuShown: true,
        module: "Role",
        component: <Roles />,
      },
    ],
  },
  {
    key: 4,
    path: "/customers",
    title: "Customers",
    className: "customers",
    isMenuShown: true,
    isSubMenu: false,
    module: "Customer",
    icon: <BsPeopleFill />,
    component: <Customers />,
    components: [
      {
        key: 24,
        path: "/:id",
        title: "Customer Details",
        className: "customerDetailPage subMenuVisibility",
        isSubMenuShown: false,
        module: "Customer",
        component: <CustomerDetailPage />,
      },
    ],
  },
  {
    key: 27,
    path: "/calendar",
    title: "Calendar",
    isMenuShown: true,
    isSubMenu: false,
    className: "calendar",
    module: "Calendar",
    icon: <AiTwotoneCalendar />,
    component: <CalTabStructure />,
    components: [],
  },
  {
    key: 31,
    path: "/stocks",
    title: "Stocks",
    isMenuShown: true,
    isSubMenu: false,
    className: "stocks",
    module: "Stock",
    icon: <AiOutlineStock />,
    component: <Stocks />,
    components: [],
  },
  {
    key: 37,
    title: "Reports",
    path: "/reports",
    isMenuShown: true,
    isSubMenu: true,
    module: ["Total Players Report","Winner Losers Report","Withdrawals Report","Earnings Report","Contest Transactions Report","Stocks Analysis Report"], 
    icon: <AiOutlineArrowRight />,
    components: [
      {
        key: 41,
        path: "/total-players",
        title: "Total Players",
        className: "TotalPlayers",
        isSubMenuShown: true,
        module: "Total Players Report",
        component: <TotalPlayers />,
      },
      {
        key: 42,
        path: "/winners-losers",
        title: "Winners/Losers",
        className: "WinnersAndLoosers",
        isSubMenuShown: true,
        module: "Winner Losers Report",
        component: <WinnersAndLosers />,
      },
      {
        key: 43,
        path: "/withdrawals",
        title: "Withdrawals",
        className: "Withdrawals",
        isSubMenuShown: true,
        module: "Withdrawals Report",
        component: <Withdrawals />,
      },
      {
        key: 38,
        path: "/earnings",
        title: "Earnings",
        className: "earnings",
        module: "Earnings Report", 
        isSubMenuShown: true,
        component: <Earnings />,
      },
      {
        key: 39,
        path: "/contest-transactions",
        title: "Contest Transactions",
        className: "playedContests",
        isSubMenuShown: true,
        module: "Contest Transactions Report",
        component: <PlayedContests />,
      },
      {
        key: 40,
        path: "/stock-analysis",
        title: "Stocks Analysis",
        className: "stockAnalysis",
        isSubMenuShown: true,
        module: "Stocks Analysis Report",
        component: <StockAnalysis />,
      },
    ],
  },
  {
    key: 7,
    path: "/inquiries",
    title: "Inquiries",
    isMenuShown: true,
    isSubMenu: false,
    className: "inquiries",
    module: "Inquiries",
    icon: <IoMdInformationCircle />,
    component: <Inquires />,
  },
  {
    key: 8,
    title: "Settings",
    path: "/settings",
    isMenuShown: true,
    isSubMenu: true,
    module: ["Plans", "System Settings", "Notifications"],
    icon: <AiFillSetting />,
    components: [
      {
        key: 19,
        path: "/plans",
        title: "Plans",
        className: "plans",
        isSubMenuShown: true,
        module: "Plans",
        component: <Plans />,
      },
      {
        key: 20,
        path: "/system-configuration",
        title: "System Configuration",
        className: "systemConfiguration",
        isSubMenuShown: true,
        module: "System Settings",
        component: <SystemConfiguration />,
      },
      {
        key: 32,
        path: "/push-notifications",
        title: "Push Notifications",
        isMenuShown: true,
        isSubMenuShown: true,
        className: "pushNotifiactions",
        module: "Notifications",
        component: <PushNotifications />,
      },
    ],
  },
  {
    key: 21,
    path: "/account-profile",
    title: "Account Profile",
    isMenuShown: false,
    isSubMenu: false,
    className: "accountProfile",
    component: <AccountProfile />,
  },
  {
    key: 22,
    path: "/forgot-password",
    title: "Forgot Password",
    isMenuShown: false,
    isSubMenu: false,
    className: "forgotPassword",
    component: <ForgotPassword />,
  },
  {
    key: 23,
    path: "/reset-password/:token",
    title: "Reset Password",
    isMenuShown: false,
    isSubMenu: false,
    className: "resetPassword",
    component: <ResetPassword />,
  },
  {
    key: 26,
    path: "/forgot-mpin/:token",
    // title: "Add Trading Group",
    isMenuShown: false,
    className: "forgotMpin",
    component: <ForgotMpin />,
  },
  {
    key: 30,
    path: "/activity-logs",
    title: "activity-logs",
    isMenuShown: false,
    isSubMenu: false,
    className: "activity-logs",
    module: "Activity Log",
    component: <ActivityLog />,
  },
  {
    key: 31,
    path: "/cms",
    title: "CMS",
    isMenuShown: true,
    isSubMenu: false,
    className: "cms",
    module: "CMS Page",
    icon: <BiBookContent />,
    component: <Cms />,
  },
  {
    key: 33,
    path: "/fyers-redirect",
    title: "Fyers",
    isMenuShown: false,
    isSubMenu: false,
    className: "fyers",
    module: "fyers",
    icon: <BiBookContent />,
  },
  {
    key: 35,
    path: "/statistics-analysis",
    title: "Analysis",
    isMenuShown: false,
    isSubMenu: false,
    className: "statisticsAnalysis",
    module: "CMS Page", //  temporary - Need to change for permission
    component: <LogicTable />,
  },
];
export default routes;
