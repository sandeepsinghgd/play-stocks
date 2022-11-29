import { AUTH_URL } from "./config";
import { createAxios } from "./axios";

const marketStatusApi = createAxios({
  baseURL: AUTH_URL + "/",
});

export const getMarketStatus = () => {
    return marketStatusApi.post("market-status?request_for=application");
};

export const setPrevMarketDate = (key: any) => {
  return marketStatusApi.get(`/system-setting/${key}`);
};