import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const activityLog = createAxios({
  baseURL: BASE_API_URL + "/",
});
export const getActivityLogs = (params: any) => {
  return activityLog.get("activity-log", { params });
};
