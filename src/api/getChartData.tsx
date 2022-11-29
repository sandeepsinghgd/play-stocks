import { THREE_CARD_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: THREE_CARD_URL + "admin",
});

export const getChartDara = () => {
  return chart.get("/chart-details");
};

export const get3CardInvestmentData = (payload: any) => {
  return chart.post("/investement-chart",payload);
};
