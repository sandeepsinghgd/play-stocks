import { GET_ROLE_ID, SET_ROLE_DATA } from '../types/role'

export const setRoles = (roles: any) => {
    return{
        type: SET_ROLE_DATA,
        payload: roles,
    }
};

export const getRoleId = (id:any) => {
    return {
        type: GET_ROLE_ID,
        payload:id 
    }
};
