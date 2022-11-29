import {GET_ROLE_ID, SET_ROLE_DATA} from "../types/role";

interface roleState {
    roles: Array<any>
}

const initialState: roleState = {
    roles : [],
};

const roles = (state = initialState, action:any) =>{
    switch(action.type){
        case SET_ROLE_DATA:
                return {
                    ...state,
                    roles : action.payload
                };
        case GET_ROLE_ID:
                return {
                    ...state,
                    roles : state.roles.filter((role, i) => role.id !== action.payload.id)
                };
        default:
            return state;
    }
};
export default roles;