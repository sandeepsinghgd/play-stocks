import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const roleApi = createAxios({
  baseURL: BASE_API_URL + "",
});

export const getRoles = (params: any) => {
  return roleApi.get("/role", { params });
};

export const createRole = (payload: any) => {
  return roleApi.post("/role", payload);
};

export const updateRole = (id: any, payload: any) => {
  return roleApi.put(`/role/${id}`, payload);
};

export const roleStatus = (payload: any) => {
  return roleApi.put("/role-status", payload);
};
