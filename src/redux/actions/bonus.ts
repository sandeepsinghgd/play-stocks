import { SET_REFERRAL_BONUS, SET_SIGN_UP_BONUS } from "../types/bonus";

export const setReferralBonus = (settings: any) => {
  return {
    type: SET_REFERRAL_BONUS,
    payload: settings,
  };
};
export const setSignUpBonus = (settings: any) => {
  return {
    type: SET_SIGN_UP_BONUS,
    payload: settings,
  };
};
