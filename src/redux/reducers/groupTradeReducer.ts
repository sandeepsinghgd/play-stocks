import {
  SET_TOTAL_USERS,
  SET_GROUP_ANALYSIS_DATA,
  SET_THREE_CARD_ANALYSIS_DATA,
} from "../types/groupTrade";

interface GroupState {
  User: string | null;
  GroupData: Object;
  ThreeCardData: Object;
}

const initialState: GroupState = {
  User: null,
  GroupData: {},
  ThreeCardData: {},
};

const GroupTradeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOTAL_USERS:
      return {
        ...state,
        User: action.payload,
      };
    case SET_GROUP_ANALYSIS_DATA:
      return {
        ...state,
        GroupData: action.payload,
      };
    case SET_THREE_CARD_ANALYSIS_DATA:
      return {
        ...state,
        ThreeCardData: action.payload,
      };
    default:
      return state;
  }
};

export default GroupTradeReducer;
