import { STOCKS_URL } from "./config";
import { createAxios } from "./axios";

const stocksApi = createAxios({
  baseURL: STOCKS_URL + "v1",
});

export const getStocks = (params: any) => {
  return stocksApi.get("/admin/stocks", { params });
};

export const setStocks = (id: any) => {
  return stocksApi.get(`/admin/symbol?type_id=${id}`);
};

export const createStock = (data: any) => {
  return stocksApi.post("/admin/stocks", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateStock = (id: any, data: any) => {
  return stocksApi.post(`/admin/stocks/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const stockStatus = (payload: any) => {
  return stocksApi.post("/admin/stock-status", payload);
};

export const deleteStock = (id: any) => {
  return stocksApi.delete(`/admin/stocks/${id}`);
};

export const getStockList = (id: any) => {
  return stocksApi.get(`/stock-type?type_for=${id}`);
};

export const fyersDetails = () => {
  return stocksApi.get("/admin/fyers");
};

export const tokenUpdate = (payload: any) => {
  return stocksApi.post("/admin/fyers", payload);
};

export const getInstrumentToken = (payload: any) => {
  return stocksApi.post("admin/get-stock-instrument", payload);
};
