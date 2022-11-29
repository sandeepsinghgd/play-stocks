import { THREE_CARD_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: THREE_CARD_URL + "admin",
});

export const threeCardWinner = (params: any) => {
  return chart.get("/get-winners",{ params });
};
