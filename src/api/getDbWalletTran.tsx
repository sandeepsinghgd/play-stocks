import { WALLET_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: WALLET_API_URL + "",
});

export const getDbWalletTransection = () => {
  return chart.get("/dashboard");
};
