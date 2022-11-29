import {SET_KITE_DATA} from "../types/kiteData";

interface kiteState {
    kiteData: Object
}

const initialState: kiteState = {
    kiteData: {}
};

const kiteReducer = (state = initialState, action:any) =>{
    switch(action.type){
        case SET_KITE_DATA: {
                return{
                    ...state,
                    kiteData :  action.payload
                };
        }
        default:
            return state;
    }
};
export default kiteReducer;
