import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const cmsApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const createCmsList = (payload: any) => {
  return cmsApi.post("/pages", payload);
};

export const getCmsList = (params: any) => {
  return cmsApi.get("/pages", { params });
};

export const updateCmsData = (id: any, payload: any) => {
  return cmsApi.put(`/pages/${id}?_method=PUT`, payload);
};

export const deleteCMSApi = (id: any) => {
  return cmsApi.delete(`/pages/${id}`);
};

export const updateCmsStatus = (payload: any) => {
  return cmsApi.put("/page-status", payload);
};
