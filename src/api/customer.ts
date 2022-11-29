import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const customerApi = createAxios({
  baseURL: BASE_API_URL + "",
});

export const getCustomers = (params: any) => {
  return customerApi.get("/customer", { params });
};

export const createCustomer = (payload: any) => {
  return customerApi.post("/customer", payload);
};

export const updateCustomer = (payload: any) => {
  return customerApi.put(`/customer/${payload.id}`, payload);
};

export const viewCustomer = (id: any) => {
  return customerApi.get(`/customer/${id}`);
};

export const customerStatus = (payload: any) => {
  return customerApi.put("/customer-status", payload);
};

export const getReferralHistory = (id: any, params: any) => {
  return customerApi.get(`/referral-history?user_id=${id}`, { params });
};
