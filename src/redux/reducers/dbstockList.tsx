import {
  DB_AUTH_DATA,
  DB_GROUP_CHART_DATA,
  DB_GROUP_INVESTMENT_DATA,
  DB_THREE_CARD_CHART_DATA,
  DB_THREE_CARD_INVESTMENT_DATA,
  GROUP_STOCK_LIST,
  THREE_STOCK_LIST,
  WALLET_TRANSECTION,
} from "../types/dbstockList";

interface userState {
  threeCardStock: object;
  groupCardStock: object | any;
  walletTransection: object | any;
  dbAuthData: object | any;
  dbGroupChart: Array<any>;
  dbThreeCardChart: Object;
  dbGroupInvestmentChart: Object;
  db3CardInvestmentChart: Object;
}

const initialState: userState = {
  threeCardStock: [],
  groupCardStock: [],
  walletTransection: [],
  dbAuthData: [],
  dbGroupChart: [],
  dbThreeCardChart: [],
  dbGroupInvestmentChart: [],
  db3CardInvestmentChart: [],
};

const dbData = (state = initialState, action: any) => {
  switch (action.type) {
    case GROUP_STOCK_LIST:
      return {
        ...state,
        groupCardStock: action.payload,
      };
    case THREE_STOCK_LIST:
      return {
        ...state,
        threeCardStock: action.payload,
      };
    case WALLET_TRANSECTION:
      return {
        ...state,
        walletTransection: action.payload,
      };
    case DB_AUTH_DATA:
      return {
        ...state,
        dbAuthData: action.payload,
      };
    case DB_GROUP_CHART_DATA:
      return {
        ...state,
        dbGroupChart: action.payload,
      };
    case DB_THREE_CARD_CHART_DATA:
      return {
        ...state,
        dbThreeCardChart: action.payload,
      };
    case DB_GROUP_INVESTMENT_DATA:
      return {
        ...state,
        dbGroupInvestmentChart: action.payload,
      };
    case DB_THREE_CARD_INVESTMENT_DATA:
      return {
        ...state,
        db3CardInvestmentChart: action.payload,
      };
    default:
      return state;
  }
};
export default dbData;
