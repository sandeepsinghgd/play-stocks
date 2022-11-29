import { GET_ADMIN_USERS, EDIT_ADMIN_USER } from "../types/admin"

export const setAdminUsers = (adminUsers:any) => {
    return {
        type: GET_ADMIN_USERS,
        payload : adminUsers
    }
}
export const editAdminUser = (adminUser:any) => {
    return {
        type: EDIT_ADMIN_USER,
        payload : adminUser
    }
}