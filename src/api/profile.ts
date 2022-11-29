import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const adminApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const getProfile = () => {
  return adminApi.get("profile");
};

export const updateProfile = (payload: any) => {
  return adminApi.put("profile", payload);
};

export const changePassword = (payload: any) => {
  return adminApi.post("change-password", payload);
};
