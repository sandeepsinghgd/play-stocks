import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const authApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const forgotPassword = (payload: any) => {
  return authApi.post("forgot-password", payload);
};

export const resitPassword = (payload: any) => {
  return authApi.post("reset-password", payload);
};
