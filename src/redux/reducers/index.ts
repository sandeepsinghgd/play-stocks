import { combineReducers } from "redux";
import auth from "./auth";
import permissionReducer from "./permission";
import uiReducer from "./uiReducer";
import roles from "./roles";
import adminUser from "./adminUser";
import user from "./user";
import emailSetting from "./emailSetting";
import calendar from "./calendar";
import bonus from "./bonus";
import eventData from "./eventData";
import notifications from "./notification";
import dbData from "./dbstockList";
import prizeDistribution from "./prizeDistribution";
import GroupTradeReducer from "./groupTradeReducer";
import LiveStocksData from "./liveStocksData";
import marketDates from "./marketDates";
import kiteReducer from "./kiteData";
import dashboard from "./dashboard";

const rootReducer = combineReducers({
  auth,
  ui: uiReducer,
  permission: permissionReducer,
  roles,
  adminUser,
  emailSetting,
  user,
  calendar,
  eventData,
  bonus,
  notifications,
  dbData,
  prizeDistribution,
  GroupTradeReducer,
  LiveStocksData,
  marketDates,
  kiteReducer,
  dashboard
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
