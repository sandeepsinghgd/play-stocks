import {
  EVENT_DATA,
  UPDATE_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  SINGLE_EVENT,
} from "../types/eventData";

export const setEvents = (allEvents: any) => {
  return {
    type: EVENT_DATA,
    payload: allEvents,
  };
};

export const addEvents = (newEvents: any) => {
  return {
    type: ADD_EVENT,
    payload: newEvents,
  };
};

export const deleteCalEvent = () => {
  return {
    type: DELETE_EVENT,
  };
};

export const singleEvent = (singleEvent: any) => {
  return {
    type: SINGLE_EVENT,
    payload: singleEvent,
  };
};

export const updateEvent = (updateData: any) => {
  return {
    type: UPDATE_EVENT,
    payload: updateData,
  };
};
