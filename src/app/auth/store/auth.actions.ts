import { Action } from '@ngrx/store';
import { User } from './../user.model';

//Add feature name to create unique action in application
//Prefered way - '[Feature] ActionType
export const AUTHENTICATE_START = '[Auth] AUTHENTICATE_START';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] SIGNUP_START';

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export type authActions = AuthenticateSuccess | Logout | AuthenticateStart | AuthenticateFail | SignupStart | AutoLogin;

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class AuthenticateStart implements Action {
    readonly type = AUTHENTICATE_START;
    constructor(public payload: {email :string, password :string}) { }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) { }
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}