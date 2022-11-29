import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: BASE_API_URL + "",
});

export const earningReportListApi = (params: any) => {
  return chart.get("/get-earnings-report", { params });
};

export const exportEarningsReport = (params: any) => {
  return chart.get("/export-earnings-report", {
    responseType: "blob",
    params,
  });
};
