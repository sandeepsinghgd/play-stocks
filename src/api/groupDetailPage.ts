import { GROUP_API_URL } from "./config";
import { createAxios } from "./axios";

const biddersApi = createAxios({
  baseURL: GROUP_API_URL + "",
});

export const getBidders = (id: any, params: any) => {
  return biddersApi.get(`/bidder?group_id=${id}`, { params });
};

export const getResults = (id: any, params: any) => {
  return biddersApi.get(`/result?group_id=${id}`, { params });
};

export const getPrizeDistribution = (id: any, rows: any, params: any) => {
  return biddersApi.get(`/winning-ratio?group_id=${id}`, { params });
};