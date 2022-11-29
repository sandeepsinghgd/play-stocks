import { GET_MARKET_STATUS, GET_PREV_MARKET_OPEN_DATE } from "../types/marketDates";

interface MarketState {
  marketPrevOpenDate: string | null;
  marketStatus: string | null;
}

const initialState: MarketState = {
    marketPrevOpenDate: "",
    marketStatus: ""
};

const marketDates = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PREV_MARKET_OPEN_DATE:
      return {
        ...state,
        marketPrevOpenDate: action.payload,
      };
      case GET_MARKET_STATUS:
      return {
        ...state,
        marketStatus: action.payload,
      };
    default:
      return state;
  }
};

export default marketDates;
