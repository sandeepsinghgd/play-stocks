import { GET_3CARD_BIDDERS_LIVE_STOCKS_DATA, GET_GROUP_RESULT_LIVE_STOCKS_DATA } from "../types/liveStocksData";

interface StocksData {
  LiveStocks: Object;
  groupResultLiveData: Object;
  threeCardBiddersLiveData: Object;
  threeCardResultLiveData: Object;
  customerGroupLiveData: Object;
  customer3CardLiveData: Object;
}

const initialState: StocksData = {
  LiveStocks: {},
  groupResultLiveData: {},
  threeCardBiddersLiveData: {},
  threeCardResultLiveData: {},
  customerGroupLiveData: {},
  customer3CardLiveData: {}
};

const LiveStocksData = (state = initialState, action: any) => {
  switch (action.type) {
      case GET_GROUP_RESULT_LIVE_STOCKS_DATA:
      return {
        ...state,
        groupResultLiveData: action.payload,
      };
      case GET_3CARD_BIDDERS_LIVE_STOCKS_DATA:
      return {
        ...state,
        threeCardBiddersLiveData: action.payload,
      };
    default:
      return state;
  }
};
export default LiveStocksData;
