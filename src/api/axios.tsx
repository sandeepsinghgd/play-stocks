import axios from "axios";
import { getAuthenticationToken } from "../utils/auth";
import { removeAuth } from "../utils/helpers";

export function createAxios(config: any) {
  const instance = axios.create(config);
  instance.interceptors.request.use(
    (config: any) => {
      config.headers.common.Accept = "application/json";
      const token = getAuthenticationToken();
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const token = getAuthenticationToken();
      if (token) {
        if (error?.response?.status === 401) {
          window.location.href = "/";
          removeAuth();
        }
      }

      return Promise.reject(error);
    }
  );
  return instance;
}
