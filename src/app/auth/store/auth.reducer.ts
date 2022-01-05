import { User } from "../user.model";
import { authActions, LOGIN, LOGIN_FAIL, LOGIN_START, LOGOUT } from "./auth.actions";

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
        case LOGIN:
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
        case LOGIN_START:
            return {
                ...state,
                errorMsg : '',
                loading : true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                errorMsg : action.payload,
                loading : false
            };
        default:
            return state;
    }
    
}