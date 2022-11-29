import { SET_PERMISSIONS } from "../types/permission";

export const setPermissions = (permissions: any) => {
  return {
    type: SET_PERMISSIONS,
    payload: permissions,
  };
};
