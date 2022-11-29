import { GET_HOLIDAYS } from "../types/calendar"

export const setHolidays = (holidays:any) => {
    return {
        type: GET_HOLIDAYS,
        payload : holidays
    }
}