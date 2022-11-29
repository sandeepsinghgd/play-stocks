import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const calendarApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const createEvent = (payload: any) => {
  return calendarApi.post("/calendars", payload);
};

export const editEvent = (id: any, payload: any) => {
  return calendarApi.put(`/calendars/${id}?_method=PUT`, payload);
};

export const getEvents = (params: any) => {
  return calendarApi.get("/calendars", { params });
};

export const deleteEvents = (id: any) => {
  return calendarApi.delete(`/calendars/${id}`);
};

export const bidStatus = () => {
  return calendarApi.post("/check-bid-status");
};