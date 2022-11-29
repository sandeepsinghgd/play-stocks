import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const pushNotificationApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const getPushNotifications = (params: any) => {
  return pushNotificationApi.get("push-notification", { params });
};

export const createPushNotification = (payload: any) => {
  return pushNotificationApi.post("send-notification", payload);
};

export const getLoginDelayNotification = () => {
  return pushNotificationApi.get("login-setting");
};

export const updateLoginDelayNotification = (payload: any) => {
  return pushNotificationApi.post("/login-setting", payload);
};
