import { exhaustMap, map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService, private store : Store<AppState>) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler){

    //ngrx way to get user
    return this.store.select('auth').pipe(map(authState => authState.user), take(1), exhaustMap(user => {

      if (!user) {
        return next.handle(req);
      }

      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token + '')
      });
      return next.handle(modifiedReq);
    }))

    /*
    return this.authService.userSub.pipe(take(1), exhaustMap(user => {

      if (!user) {
        return next.handle(req);
      }

      const modifiedReq = req.clone({
        params : new HttpParams().set('auth', user.token+'')
      });
      return next.handle(modifiedReq);
    }))
    */

  }
}
