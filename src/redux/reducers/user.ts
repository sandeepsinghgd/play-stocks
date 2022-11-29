import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PERMISSION_SLUGS,
  SET_CURRENT_USER_PERMISSION_MODULES,
} from "../types/user";

interface userState {
  currentUser: object | any;
  currentUserPermissions: Array<any>;
  currentUserPermissionModules: Array<any>;
}

const initialState: userState = {
  currentUser: {},
  currentUserPermissions: [],
  currentUserPermissionModules: [],
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_CURRENT_USER_PERMISSION_SLUGS:
      return {
        ...state,
        currentUserPermissions: action.payload,
      };
    case SET_CURRENT_USER_PERMISSION_MODULES:
      return {
        ...state,
        currentUserPermissionModules: action.payload,
      };
    default:
      return state;
  }
};
export default user;

