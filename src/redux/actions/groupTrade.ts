import {
  SET_TOTAL_USERS,
  SET_GROUP_ANALYSIS_DATA,
  SET_THREE_CARD_ANALYSIS_DATA,
} from "../types/groupTrade";

export const setTotalUsers = (users: any) => {
  return {
    type: SET_TOTAL_USERS,
    payload: users,
  };
};

export const setGroupAnalysisData = (groupData: any) => {
  return {
    type: SET_GROUP_ANALYSIS_DATA,
    payload: groupData,
  };
};

export const setThreeCardAnalysisData = (threeCardData: any) => {
  return {
    type: SET_THREE_CARD_ANALYSIS_DATA,
    payload: threeCardData,
  };
};
