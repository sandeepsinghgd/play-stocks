import { THREE_CARD_URL } from "./config";
import { createAxios } from "./axios";

const threeCardApi = createAxios({
  baseURL: THREE_CARD_URL + "admin",
});

export const getThreeCardList = (params: any) => {
  return threeCardApi.get("/group?", { params });
};

export const createThreeCardGroup = (payload: any) => {
  return threeCardApi.post("/group", payload);
};

export const updateStatusThreeCard = (payload: any) => {
  return threeCardApi.post("/group-status", payload);
};
export const viewThreeCardGroupApi = (id: any) => {
  return threeCardApi.get("/group/" + id);
};

export const getThreeCardBidders = (id: any, params: any) => {
  return threeCardApi.get(`/bidder?group_id=${id}`, { params });
};

export const getThreeCardResults = (id: any, params: any) => {
  return threeCardApi.get(`/result?group_id=${id}`, { params });
};

export const getCustomerThreeCardData = (id: any, params: any) => {
  return threeCardApi.get(`/customer-bids/${id}`, { params });
};
