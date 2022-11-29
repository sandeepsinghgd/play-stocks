import { WALLET_API_URL } from "./config";
import { createAxios } from "./axios";

const reportApi = createAxios({
    baseURL: WALLET_API_URL,
  });

  export const getWithdrawalsreport = (params: any) => {
    return reportApi.get("/get-withdrawals-report", { params });
  };

  export const exportWithdrawalsreport = (params: any) => {
    return reportApi.get("/export-withdrawals-report",
      {
        responseType: "blob",
        params
      }
    );
  };