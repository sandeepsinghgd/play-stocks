import { GROUP_API_URL } from "./config";
import { createAxios } from "./axios";

const groupTradingApi = createAxios({
    baseURL: GROUP_API_URL,
  });

export const getGroupAnalysis = (payload: any) => {
    return groupTradingApi.post("result-analysis", payload);
  };