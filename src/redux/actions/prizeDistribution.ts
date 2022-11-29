import { SET_WINNING_RATIO } from "../types/prizeDistribution";

export const setWinningRatio = (ratio: any) => {
  return {
    type: SET_WINNING_RATIO,
    payload: ratio,
  };
};
