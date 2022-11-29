import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: BASE_API_URL + "",
});

export const totalPlayerReportListApi = (params: any) => {
  return chart.get("/get-total-players-report", { params });
};

export const contestsListApi = (params: any) => {
  return chart.get("/get-contests-list", { params });
};

export const exportTotalPlayerList = (params: any) => {
  return chart.get("/export-total-players-report", {
    responseType: "blob",
    params,
  });
};
