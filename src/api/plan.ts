import { WALLET_API_URL } from "./config";
import { createAxios } from "./axios";

const planApi = createAxios({
  baseURL: WALLET_API_URL + "/",
});

export const getPlans = (params: any) => {
  // return planApi.get('?sort=id&order=desc&rows=10');
  return planApi.get("plan", { params });
};

export const createPlan = (payload: any) => {
  return planApi.post("plan", payload);
};

export const updatePlan = (payload: any) => {
  return planApi.put("plan", payload);
};

export const changePlanStatus = (payload: any) => {
  return planApi.post("plan-change-status", payload);
};
