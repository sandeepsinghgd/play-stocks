import { AUTH_URL } from "./config";
import { createAxios } from "./axios";

const authApi = createAxios({
  baseURL: AUTH_URL + "/",
});

export const forgotMpin = (payload: any) => {
  return authApi.post("customer/reset-pin", payload);
};
