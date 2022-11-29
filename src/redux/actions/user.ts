import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PERMISSION_SLUGS,
  SET_CURRENT_USER_PERMISSION_MODULES,
} from "../types/user";

export const setCurrentUser = (user: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
export const setCurrentUserPermissionSlugs = (slugs: any) => {
  return {
    type: SET_CURRENT_USER_PERMISSION_SLUGS,
    payload: slugs,
  };
};
export const setCurrentUserPermissionModules = (modules: any) => {
  return {
    type: SET_CURRENT_USER_PERMISSION_MODULES,
    payload: modules,
  };
};
