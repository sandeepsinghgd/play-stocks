import { SET_EMAIL_SETTING } from "../types/emailSetting";

export const setEmailSetting = (settings: any) => {
  return {
    type: SET_EMAIL_SETTING,
    payload: settings,
  };
};
