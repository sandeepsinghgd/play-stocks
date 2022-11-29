import {
  DELETE_EVENT,
  EVENT_DATA,
  SINGLE_EVENT,
  UPDATE_EVENT,
  ADD_EVENT,
} from "../types/eventData";

interface calendarHolidays {
  allEvents: Array<any>;
  newAddedEvent: Array<any>;
  singleEvent: Array<any>;
}

const initialState: calendarHolidays = {
  allEvents: [],
  newAddedEvent: [],
  singleEvent: [],
};

const eventData = (state = initialState, action: any) => {
  switch (action.type) {
    case EVENT_DATA: {
      const sortedEvents = action.payload.sort(
        (a: any, b: any) =>
          Number(new Date(a.event_date)) - Number(new Date(b.event_date))
      );

      return {
        ...state,

        allEvents: [...sortedEvents],
      };
    }
    case ADD_EVENT: {
      const appendNewData = [...state.allEvents, action.payload];
      const sortedEvents = appendNewData.sort(
        (a: any, b: any) =>
          Number(new Date(a.event_date)) - Number(new Date(b.event_date))
      );
      return {
        ...state,

        allEvents: [...sortedEvents],
      };
    }
    case DELETE_EVENT: {
      return {
        ...state,

        allEvents: [...state.allEvents],
      };
    }

    case SINGLE_EVENT: {
      return {
        ...state,
        singleEvent: [...action.payload],
      };
    }

    case UPDATE_EVENT: {
      const updatedData = state.allEvents.map((event: any) =>
        event.id == action.payload.id ? action.payload : event
      );
      return {
        ...state,
        allEvents: updatedData,
      };
    }
    default:
      return state;
  }
};
export default eventData;
