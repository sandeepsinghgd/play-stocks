import { SET_MENU_KEY, TOGGLE_SIDEBAR_VISIBILITY } from "../types/ui";

const INITIAL_STATE = {
    isSidebarVisible: false,
    menuKey: [],
};

const uiReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR_VISIBILITY: {
            const isSidebarVisible = (!state.isSidebarVisible);
            return {
                ...state,
                isSidebarVisible
            };
        }
        case SET_MENU_KEY: {
            return {
                ...state,
                menuKey: action.payload
            };
        }
        default:
            return state;
    }
};

export default uiReducer;