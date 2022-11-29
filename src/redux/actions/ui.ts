import { SET_MENU_KEY, TOGGLE_SIDEBAR_VISIBILITY } from "../types/ui";

export const toggleSideBarVisibility = () => {
  return {
    type: TOGGLE_SIDEBAR_VISIBILITY,
  };
};
export const setMenyKey = (key: any) => {
  return {
    type: SET_MENU_KEY,
    payload: key,
  };
};
