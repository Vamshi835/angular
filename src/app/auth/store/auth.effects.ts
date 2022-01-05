import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { LOGIN, Login, LoginFail, LoginStart, LOGIN_START } from "./auth.actions";
import { environment } from "../../../environments/environment.prod";
import { AuthResponse } from "../auth.service";
import { of } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(LOGIN_START),
        switchMap((authData : LoginStart) => {
            const url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
            let obj = {
                'email': authData.payload.email,
                'password': authData.payload.password,
                'returnSecureToken': true
            };

            return this.http.post<AuthResponse>(url, obj).pipe(
                map(response => {
                        const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                        const user = new User(response.email, response.localId, response.idToken, expDate);
                    return new Login(user);
                }),
                catchError( err => {
                    let errorMsg = "unknown Error";
                    if (!err.error || !err.error.error) {
                        return of (new LoginFail(errorMsg));
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
                    return of(new LoginFail(errorMsg));
                    }
                )
            );
        })
    );
    
    @Effect({dispatch : false})
    loginSuccess = this.actions$.pipe(ofType(LOGIN), tap(() => {
        this.router.navigate(['./recipies']);
    }));

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}