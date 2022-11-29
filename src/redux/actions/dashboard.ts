import {
    INVESTED_AMOUNTS
} from "../types/dashboard"

export const setInvestedAmounts = (data: any) => {
    return {
        type: INVESTED_AMOUNTS,
        payload : data
    }
}

