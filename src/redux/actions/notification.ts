import { GET_NOTIFICATION } from "../types/notification";

export const setDelayNotification = (adminUsers: any) => {
  return {
    type: GET_NOTIFICATION,
    payload: adminUsers,
  };
};
