import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const inquiryApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const getInquiries = (params: any) => {
  return inquiryApi.get("inquiry", { params });
};
