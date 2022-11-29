import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const permissionApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const getPermissions = () => {
  return permissionApi.get("permission");
};
