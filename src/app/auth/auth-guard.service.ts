import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private router:Router, private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    // ngrx way to get user
    return this.store.select('auth').pipe(map(authState => {
      return authState.user;
    }),map(user => {
      const isAuth = user.token;
      if (isAuth != null) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    })

    /*
    return this.authService.userSub.pipe(map(user => {
      const isAuth = user.token;
      // console.log("isAuth - ", isAuth);
      if (isAuth != null) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    })
    */

    );
  }
}
