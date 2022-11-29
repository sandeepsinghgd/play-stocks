import { AUTH_URL } from "./config";
import { createAxios } from "./axios";

const adminApi = createAxios({
  baseURL: AUTH_URL + "/",
});

export const getNotifications = () => {
  return adminApi.get("notification");
};

export const readAllNotifications = () => {
  return adminApi.get("read-all-notifications");
};

export const minWithdrawAmount = () => {
  return adminApi.get("system-setting/MINIMUM_WITHDRAW");
};

export const maxWithDrawAmount = () => {
  return adminApi.get("system-setting/MAXIMUM_WITHDRAW");
};
