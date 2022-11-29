import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const adminApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const getAdminUsers = (params: any) => {
  return adminApi.get("user", { params });
};

export const loadRoles = () => {
  return adminApi.get("load-roles");
};

export const createAdminUsers = (payload: any) => {
  return adminApi.post("user", payload);
};
export const updateAdminUsers = (payload: any) => {
  return adminApi.put("user/" + payload.id, payload);
};
export const adminUserStatus = (payload: any) => {
  return adminApi.put("/user-status", payload);
};
