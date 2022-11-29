import {
  GET_3CARD_BIDDERS_LIVE_STOCKS_DATA,
  GET_GROUP_RESULT_LIVE_STOCKS_DATA
} from "../types/liveStocksData";

export const getGroupResultLiveData = (stocksData: any) => {
  const stocks: any = {};
  for (const stock in stocksData) {
    if (stock != null) {
      const symbol = stocksData[stock]?.symbol;
      stocks[symbol] = stocksData[stock];
    }
  }
  return {
    type: GET_GROUP_RESULT_LIVE_STOCKS_DATA,
    payload: stocks,
  };
};
export const get3CardBiddersLiveData = (stocksData: any) => {
  const stocks: any = {};
  for (const stock in stocksData) {
    if (stock != null) {
      const symbol = stocksData[stock]?.symbol;
      stocks[symbol] = stocksData[stock];
    }
  }
  return {
    type: GET_3CARD_BIDDERS_LIVE_STOCKS_DATA,
    payload: stocks,
  };
};