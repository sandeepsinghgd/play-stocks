import { THREE_CARD_URL } from "./config";
import { createAxios } from "./axios";

const threeCardApi = createAxios({
  baseURL: THREE_CARD_URL + "admin",
});

export const get3CardAnalysis = (payload: any) => {
    return threeCardApi.post("result-analysis", payload);
  };