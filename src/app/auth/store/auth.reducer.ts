import { User } from "../user.model";
import { authActions, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, AUTHENTICATE_START, LOGOUT, SIGNUP_START } from "./auth.actions";

export interface AuthState {
    user : User;
    errorMsg : string;
    loading : boolean;
}

const intitalState: AuthState = {
    user: new User('', '', '', new Date()),
    errorMsg : '',
    loading : false
}

export function authReducer(state : AuthState = intitalState, action : authActions) : AuthState {
    
    switch (action.type) {
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                user : action.payload,
                errorMsg : '',
                loading : false
            };
        case LOGOUT:
            return {
                ...state,
                user: new User('', '', '', new Date()),
                errorMsg : '',
                loading : false
            };
        case AUTHENTICATE_START:
            return {
                ...state,
                errorMsg : '',
                loading : true
            };
        case AUTHENTICATE_FAIL:
            return {
                ...state,
                errorMsg : action.payload,
                loading : false
            };
        case SIGNUP_START:
            return {
                ...state,
                errorMsg: '',
                loading: false
            };
        case LOGOUT:
        default:
            return state;
    }
    
}