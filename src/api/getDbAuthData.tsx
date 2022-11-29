import { createAxios } from "./axios";
import { BASE_API_URL } from "./config";

const dbAuthData = createAxios({
  baseURL: BASE_API_URL,
});

export const getDbauthData = () => {
  return dbAuthData.get("/dashboard");
};
