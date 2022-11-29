import { WALLET_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: WALLET_API_URL + "",
});

export const playedContestListApi = (params: any) => {
  return chart.get("/get-contest-transactions-report", { params });
};

export const playedContestExportApi = (params: any) => {
  return chart.get("/export-contest-transactions-report", {
    responseType: "blob",
    params,
  });
};
