import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const reportApi = createAxios({
    baseURL: BASE_API_URL,
  });

  export const getWinnnersAndLoosersListApi = (params: any) => {
    return reportApi.get("/get-winner-loser-report", { params });
  };

  export const exportWinnersAndLoosersApi = (params: any) => {
    return reportApi.get("/export-winner-looser-report",
      {
        responseType: "blob",
        params
      }
    );
  };