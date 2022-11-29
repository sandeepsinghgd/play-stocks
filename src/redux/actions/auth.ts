import { Dispatch } from "redux";
import { ActionType, Action } from "../types/auth";

export const setToken = (token: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_TOKEN_SUCCESS,
      payload: token,
    });
  };
};
