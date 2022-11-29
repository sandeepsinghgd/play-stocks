import { SET_KITE_DATA } from "../types/kiteData";

export const setKiteData = (data: any) => {
  return {
    type: SET_KITE_DATA,
    payload: data,
  };
};
