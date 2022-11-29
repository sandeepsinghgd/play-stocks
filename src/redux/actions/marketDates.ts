import { GET_MARKET_STATUS, GET_PREV_MARKET_OPEN_DATE } from "../types/marketDates";

export const getPrevMarketDate = (date: any) => {
  return {
    type: GET_PREV_MARKET_OPEN_DATE,
    payload: date,
  };
};

export const setMarketStatus = (status: any) => {
  return {
    type: GET_MARKET_STATUS,
    payload: status,
  };
};

