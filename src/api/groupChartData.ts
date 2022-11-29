import { GROUP_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: GROUP_API_URL ,
});

export const getGroupChartData = () => {
  return chart.get("/chart-details");
};

export const getGroupInvestmentData = (payload: any) => {
  return chart.post("/investement-chart",payload);
};