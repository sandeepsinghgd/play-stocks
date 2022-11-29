import { SET_WINNING_RATIO } from "../types/prizeDistribution";

interface WinningState {
  winningRatio: Array<any>;
}

const initialState: WinningState = {
  winningRatio: [],
};

const prizeDistribution = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_WINNING_RATIO: {
      return {
        ...state,
        winningRatio: action.payload,
      };
    }
    default:
      return state;
  }
};
export default prizeDistribution;
