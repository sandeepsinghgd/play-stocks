import { GROUP_API_URL, WALLET_API_URL, AUTH_URL, THREE_CARD_URL } from "./config";
import { createAxios } from "./axios";

const groupApi = createAxios({baseURL: GROUP_API_URL + ""});
const threeCardApi = createAxios({baseURL: THREE_CARD_URL + ""});
const walletApi = createAxios({baseURL: WALLET_API_URL + ""});
const authApi = createAxios({baseURL: AUTH_URL + ""});

export const getTodayGroupTrading = (params: any) => {
  return groupApi.get("/get-today-group-trading", { params });
};

export const getTodayThreeCardTrading = (params: any) => {
  return threeCardApi.get("/admin/get-today-three-card-trading", { params });
};

export const getTodayStockTrades = (params: any) => {
  return authApi.get("/admin/get-today-stock-trades", { params });
};
 
export const getGroupTradingWinners = (params: any) => {
  return groupApi.get("/get-group-trading-winners", { params });
};

export const getThreeCardTradingWinners = (params: any) => {
  return threeCardApi.get("/admin/get-three-card-trading-winners", { params });
};

export const getLatestTransactions = (params: any) => {
  return walletApi.get("/get-latest-transactions", { params });
};
  
export const getDashboard = (params: any) => {
  return authApi.get("/admin/dashboard", { params });
};

export const getAmountStatistics = (params: any) => {
  return authApi.get("/admin/get-amount-statistics", { params });
};
  
export const getInvestedAmounts = (params: any) => {
  return authApi.get("/admin/get-invested-amounts", { params });
};
