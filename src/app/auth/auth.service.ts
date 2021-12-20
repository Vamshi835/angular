import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponse {
  localId:string,
  email:string,
  displayName?:string,
  idToken: string,
  registered?: boolean,
  refreshToken:string,
  expiresIn:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub = new  BehaviorSubject<User>(new User('', '', '', new Date()));
  private expTimeOut: any;

  constructor(private http: HttpClient, private router:Router) { }

    public signUp (email : string, password:string) {
      const url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYtuNBaXk0QsgOjRazqgQqKfxwrE8sU9Y';
      let obj = {
        'email' : email,
        'password': password,
        'returnSecureToken':true
      };

      return this.http.post<AuthResponse>(url, obj)
        .pipe(catchError(this.errorHandling), tap(response => {
          const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
          const user = new User(response.email, response.localId, response.idToken, expDate);
          this.userSub.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.autLogout(+response.expiresIn * 1000);
        }));
    }

  public login(email: string, password: string) {
    const url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYtuNBaXk0QsgOjRazqgQqKfxwrE8sU9Y';
    let obj = {
      'email': email,
      'password': password,
      'returnSecureToken': true
    };

    return this.http.post<AuthResponse>(url, obj)
      .pipe(catchError(this.errorHandling), tap(response => {
        const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        const user = new User(response.email, response.localId, response.idToken, expDate);
        this.userSub.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.autLogout(+response.expiresIn * 1000);
      }));
  }

  logout() {
    this.userSub.next(new User('', '', '', new Date()));
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');

    if (this.expTimeOut) {
      clearTimeout(this.expTimeOut);
    }
    this.expTimeOut = null;
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return;
    }

    const data = JSON.parse(userData);
    const user = new User(data.email, data.id, data._token, new Date(data._tokenExpriationDate));
    if (user.token) { 
      this.userSub.next(user)
      const time = new Date(data._tokenExpriationDate).getTime() - new Date().getTime();
      this.autLogout(time);
    };

  }

  autLogout(time:number) {
    console.log('Exp time - ', time)
   this.expTimeOut=
     setTimeout(() => {
      this.logout();
    }, time);
  }

  private errorHandling( err : any) {
    let errorMsg = "unknown Error";
    if (!err.error || !err.error.error) {
      return throwError(errorMsg);
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

    return throwError(errorMsg);
    
  }
}
