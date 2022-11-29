import { GROUP_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: GROUP_API_URL + "",
});

export const getGCTWinners = (params: any) => {
  return chart.get("/get-winners", { params });
};
