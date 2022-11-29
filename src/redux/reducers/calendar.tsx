import { GET_HOLIDAYS } from "../types/calendar";

interface calendarHolidays {
  holidays: Array<any>;
}

const initialState: calendarHolidays = {
  holidays: [
    "2022-02-27",
    "2022-03-05",
    "2022-03-06",
    "2022-03-09",
    "2022-03-12",
    "2022-03-13",
    "2022-03-19",
    "2022-03-20",
    "2022-03-22",
    "2022-03-26",
    "2022-03-27",
    "2022-03-05",
    "2022-04-02",
    "2022-04-03",
  ],
};

const calendar = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_HOLIDAYS: {
      return {
        ...state,
        holidays: [...state.holidays, action.payload],
      };
    }
    default:
      return state;
  }
};
export default calendar;
