import {
    INVESTED_AMOUNTS
 } from "../types/dashboard";

interface dashboardState {
    investedAmounts: Array<any>;
}

const initialState: dashboardState = {
    investedAmounts: []
};

const bonus = (state = initialState, action: any) => {
  switch (action.type) {
    case INVESTED_AMOUNTS:
      return {
        ...state,
        investedAmounts: action.payload
      };
    default:
      return state;
  }
};
export default bonus;
