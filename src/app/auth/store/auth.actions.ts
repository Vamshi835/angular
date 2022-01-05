import { Action } from '@ngrx/store';
import { User } from './../user.model';

//Add feature name to create unique action in application
//Prefered way - '[Feature] ActionType
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export type authActions = Login | Logout | LoginStart | LoginFail;

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: User) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email :string, password :string}) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) { }
}