import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";
import { removeAuth } from "../utils/helpers";

const authApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const authenticateUser = (payload: any) => {
  return authApi.post("login", payload);
};

export const logout = () => {
  const token = localStorage.getItem("token");

  removeAuth();
  return authApi.post(
    BASE_API_URL + "/logout",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
