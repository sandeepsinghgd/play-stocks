import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const chart = createAxios({
  baseURL: BASE_API_URL + "",
});

export const stockAnalysisListApi = (params:any) =>{
    return chart.get("/get-stock-analysis-report", {params});
};

export const stockAnalysisExportApi = (params: any) => {
  return chart.get("/export-stock-analysis-report",
    {
      responseType: "blob",
      params
    }
  );
};