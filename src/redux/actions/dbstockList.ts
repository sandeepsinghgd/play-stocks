import {
  DB_AUTH_DATA,
  DB_GROUP_CHART_DATA,
  DB_THREE_CARD_CHART_DATA,
  GROUP_STOCK_LIST,
  THREE_STOCK_LIST,
  WALLET_TRANSECTION,
  DB_GROUP_INVESTMENT_DATA,
  DB_THREE_CARD_INVESTMENT_DATA
} from "../types/dbstockList";

export const dbStockListGT = (data: any) => {
  return {
    type: GROUP_STOCK_LIST,
    payload: data,
  };
};
export const dbStockList3CT = (data: any) => {
  return {
    type: THREE_STOCK_LIST,
    payload: data,
  };
};
export const walletTransections = (data: any) => {
  return {
    type: WALLET_TRANSECTION,
    payload: data,
  };
};
export const dbAuthData = (data: any) => {
  return {
    type: DB_AUTH_DATA,
    payload: data,
  };
};
export const dbGroupChartData = (data: any) => {
  return {
    type: DB_GROUP_CHART_DATA,
    payload: data,
  };
};
export const dbThreeCardChartData = (data: any) => {
  return {
    type: DB_THREE_CARD_CHART_DATA,
    payload: data,
  };
};
export const dbGroupInvestmentData = (data: any) => {
  return {
    type: DB_GROUP_INVESTMENT_DATA,
    payload: data,
  };
};
export const dbThreeCardInvestmentData = (data: any) => {
  return {
    type: DB_THREE_CARD_INVESTMENT_DATA,
    payload: data,
  };
};