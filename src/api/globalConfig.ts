import { BASE_API_URL } from "./config";
import { createAxios } from "./axios";

const settingApi = createAxios({
  baseURL: BASE_API_URL + "/",
});

export const getGlobalConfig = (id: any) => {
  return settingApi.get(`setting?settings_for=${id}`);
};

export const getRefferalBonusTypes = () => {
  return settingApi.get("refferal-bonus-types");
};

export const getRefferalBonusFor = () => {
  return settingApi.get("refferal-bonus-for");
};

export const getSignUpBonusTypes = () => {
  return settingApi.get("signup-bonus-types");
};

export const updateGlobalConfig = (payload: any) => {
  return settingApi.put("global-setting", payload);
};

export const getMailConfig = () => {
  return settingApi.get("email-setting");
};

export const updateMailConfig = (payload: any) => {
  return settingApi.post("email-setting", payload);
};

export const updateBonus = (payload: any) => {
  return settingApi.put("bonus-setting", payload);
};
export const updateBonusStatus = (payload: any) => {
  return settingApi.put("bonus-setting", payload);
};

export const updateBonuStatusSwitch = (payload: any) => {
  return settingApi.post("signup-bonus", payload);
};

export const getBonusSwitch = (payload: any) => {
  return settingApi.post("signup-bonus", payload);
};
