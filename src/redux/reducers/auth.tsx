import { Action, ActionType } from "../types/auth";
interface AuthState {
  token: string | null;
  isUserAuthenticated: boolean;
}

const initialState: AuthState = {
  token: "",
  isUserAuthenticated: false,
};

const AuthReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SET_TOKEN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isUserAuthenticated: payload.isUserAuthenticated,
      };
    default:
      return state;
  }
};

export default AuthReducer;
