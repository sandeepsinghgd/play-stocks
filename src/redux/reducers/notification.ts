import { GET_NOTIFICATION } from "../types/notification";

interface notification {
  delayNotification: object | any;
}

const initialState: notification = {
  delayNotification: {},
};

const notifications = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        delayNotification: action.payload,
      };
    default:
      return state;
  }
};
export default notifications;
