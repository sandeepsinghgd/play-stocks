import { WALLET_API_URL } from "./config";
import { createAxios } from "./axios";

const historyApi = createAxios({
  baseURL: WALLET_API_URL + "/",
});

export const getCustomerTransactionHistory = (id: any, params: any) => {
  return historyApi.get(`customer-wallet-history?user_id=${id}`, { params });
};

export const getTransactionHistory = (params: any) => {
  return historyApi.get("wallet-history", { params });
};

export const getSignUpHistory = (id: any, params: any) => {
  return historyApi.get(`signup-history?user_id=${id}`, { params });
};

export const customerBankDetails = (id: any) => {
  return historyApi.get(`/bank-detail/${id}`);
};