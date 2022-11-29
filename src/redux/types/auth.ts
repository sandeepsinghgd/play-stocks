export enum ActionType {
  SET_TOKEN_SUCCESS = "SET_TOKEN_SUCCESS", // eslint-disable-line
  SET_TOKEN_FAIL = "", // eslint-disable-line
}

interface actionSuccess {
  type: ActionType.SET_TOKEN_SUCCESS;
  payload: {
    token: string;
    isUserAuthenticated: boolean;
  };
}

interface actionFail {
  type: ActionType.SET_TOKEN_FAIL;
  payload: {
    token: string;
    isUserAuthenticated: boolean;
  };
}

export type Action = actionSuccess | actionFail;
