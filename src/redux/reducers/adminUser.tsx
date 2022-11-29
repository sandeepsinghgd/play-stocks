import {GET_ADMIN_USERS, EDIT_ADMIN_USER} from "../types/admin";

interface AdminState {
    adminUsers: Array<any>
    adminUser: Object
}

const initialState: AdminState = {
    adminUsers : [],
    adminUser: {}
};

const admin = (state = initialState, action:any) =>{
    switch(action.type){
        case GET_ADMIN_USERS: {
                return{
                    ...state,
                    adminUsers : [...state.adminUsers, action.payload]
                };
        }
        case EDIT_ADMIN_USER:
                return {
                    ...state,
                    adminUser : state.adminUsers.filter((data, i) => data.id === action.payload.id)[0]
                };
        default:
            return state;
    }
};
export default admin;
