import { SET_PERMISSIONS } from "../types/permission";

const INITIAL_STATE = {
  permissions: [],
};

const permissionReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_PERMISSIONS: {
      return {
        ...state,
        permissions: action.payload,
      };
    }
    default:
      return state;
  }
};

export default permissionReducer;
