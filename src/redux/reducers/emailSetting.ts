import { SET_EMAIL_SETTING } from "../types/emailSetting";

interface userState {
  emailSetting: object | any;
}

const initialState: userState = {
  emailSetting: {},
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_EMAIL_SETTING:
      return {
        ...state,
        emailSetting: action.payload,
      };
    default:
      return state;
  }
};
export default user;
