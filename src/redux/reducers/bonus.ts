import { SET_REFERRAL_BONUS, SET_SIGN_UP_BONUS } from "../types/bonus";

interface bonusState {
  refferalBonus: Array<any>;
  signupBonus: Array<any>;
}

const initialState: bonusState = {
  refferalBonus: [],
  signupBonus: [],
};

const bonus = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REFERRAL_BONUS:
      return {
        ...state,
        refferalBonus: action.payload.filter((b: any) =>
          b.key.includes("REFFERAL_BONUS")
        ),
      };
    case SET_SIGN_UP_BONUS:
      return {
        ...state,
        signupBonus: action.payload.filter((b: any) =>
          b.key.includes("SIGNUP_BONUS")
        ),
      };
    default:
      return state;
  }
};
export default bonus;
