import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AUTHENTICATE_SUCCESS, AuthenticateSuccess, AuthenticateFail, AuthenticateStart, AUTHENTICATE_START, SIGNUP_START, SignupStart, LOGOUT, AUTO_LOGIN, Logout } from "./auth.actions";
import { environment } from "../../../environments/environment.prod";
import { AuthResponse, AuthService } from "../auth.service";
import { of } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    @Effect()
    signUpStart = this.actions$.pipe(
        ofType(SIGNUP_START),
        switchMap((authData : SignupStart) => {
            const url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
            let obj = {
                'email': authData.payload.email,
                'password': authData.payload.password,
                'returnSecureToken': true
            };

            return this.handleAuthentication(url, obj);
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AUTHENTICATE_START),
        switchMap((authData : AuthenticateStart) => {
            const url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
            let obj = {
                'email': authData.payload.email,
                'password': authData.payload.password,
                'returnSecureToken': true
            };
            return this.handleAuthentication(url, obj);
        })
    );
    
    @Effect({dispatch : false})
    loginSuccess = this.actions$.pipe(ofType(AUTHENTICATE_SUCCESS), tap(() => {
        this.router.navigate(['/']);
    }));

    @Effect({ dispatch: false })
    logoutSuccess = this.actions$.pipe(ofType(LOGOUT), tap(() => {
        localStorage.removeItem('user');
        this.authService.clearTimer();
        this.router.navigate(['/auth']);
    }));

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AUTO_LOGIN), map(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            return new Logout();
        }
        const data = JSON.parse(userData);
        const user = new User(data.email, data.id, data._token, new Date(data._tokenExpriationDate));
        if (user.token) {
            const time = new Date().getTime() - new Date(data._tokenExpriationDate).getTime();
            this.authService.clearTimer();
            this.authService.setTimer(time);
            return new AuthenticateSuccess(user);
        }
        return new Logout();
    }));


    private handleAuthentication(url : string, obj : Object ) {
        return this.http.post<AuthResponse>(url, obj).pipe(
            tap((data) => {
                this.authService.setTimer(+data.expiresIn * 1000);
            }),
            map(response => {
                const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                const user = new User(response.email, response.localId, response.idToken, expDate);
                localStorage.setItem('user', JSON.stringify(user));
                return new AuthenticateSuccess(user);
            }),
            catchError(err => {
                let errorMsg = "unknown Error";
                if (!err.error || !err.error.error) {
                    return of(new AuthenticateFail(errorMsg));
                }

                switch (err.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMsg = 'The email address is already in use by another account.';
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        errorMsg = 'Password sign-in is disabled for this project.';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMsg = 'The password is invalid or the user does not have a password.';
                        break;
                    case 'USER_DISABLED':
                        errorMsg = 'The user account has been disabled by an administrator. Please contact administrator';
                        break;
                }
                return of(new AuthenticateFail(errorMsg));
            }
            )
        );
    }


    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService : AuthService) { }
}