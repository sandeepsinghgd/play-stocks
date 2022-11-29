import { WALLET_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: WALLET_API_URL + "",
});

export const withdrawRequestList = (params: any) => {
  return chart.get("/get-withdraw-lists", { params });
};

export const withdrawStatusUpdate = (payload: any) => {
  return chart.post("/change-withdraw-status?", payload);
};


export const exportWithdrawRequestListApi = (params: any) => {
  return chart.get("/export-withdraw-requests?",
  {
    responseType: "blob",
    params
  }
  );
};
