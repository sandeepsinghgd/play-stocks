import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const adminApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const analysisUsers = (payload: any) => {
    return adminApi.post("user-analysis", payload);
  };