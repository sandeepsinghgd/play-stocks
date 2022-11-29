import { STOCKS_URL } from "./config";
import { createAxios } from "./axios";

const stocksApi = createAxios({
  baseURL: STOCKS_URL + "v1",
});

export const getKiteDetails = () => {
  return stocksApi.get("/admin/kite");
};

export const updateKiteDetails = (payload: any) => {
    return stocksApi.post("/admin/kite", payload);
  };