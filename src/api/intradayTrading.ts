import { INTRA_API_URL } from './config';
import { createAxios } from './axios';

const intradayTradingApi = createAxios({
  baseURL: INTRA_API_URL,
});

export const getIntradayTradingList = (params: any) => {
  return intradayTradingApi.get('/intraday-bid'); 
};