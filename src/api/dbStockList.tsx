import { THREE_CARD_URL, GROUP_API_URL } from "./config";
import { createAxios } from "./axios";
// import { GROUP_API_URL } from "./config";
const threeCardStock = createAxios({
  baseURL: THREE_CARD_URL + "admin",
});
const groupTradingStock = createAxios({
  baseURL: GROUP_API_URL + "",
});

export const getThreeCardStock = () => {
  return threeCardStock.get("/dashboard");
};

export const getGroupCardStock = () => {
  return groupTradingStock.get("/dashboard");
};
