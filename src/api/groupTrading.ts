import { GROUP_API_URL } from "./config";
import { createAxios } from "./axios";

const groupTradingApi = createAxios({
  baseURL: GROUP_API_URL,
});

export const getGroupTradingList = (params: any) => {
  return groupTradingApi.get("/groups", { params });
};
export const createGroup = (payload: any) => {
  return groupTradingApi.post("/group", payload);
};
export const viewGroup = (id: any) => {
  return groupTradingApi.get("/group/" + id);
};
export const updateGroup = (payload: any) => {
  return groupTradingApi.put("/group?_method=PUT", payload);
};

export const groupStatus = (payload: any) => {
  return groupTradingApi.post("/group-change-status", payload);
};
export const customerGroupTradingData = (payload: any, params: any) => {
  return groupTradingApi.post("/customer-bids", payload, { params });
};
export const deleteCustomerGroup = (id: any) => {
  return groupTradingApi.delete(`/delete-user-bid/${id}`);
};
export const createWinningRatio = (payload: any) => {
  return groupTradingApi.post("/winning-ratio", payload);
};
export const listWinningRatio = (id: any) => {
  return groupTradingApi.get("/winning-ratio/" + id);
};

