import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { DataAccessService } from "../shared/data-access.service";
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated:boolean = false;
  authUserSub!: Subscription;

  constructor(private dataAccessService: DataAccessService, private authService:AuthService, private store : Store<AppState>) { }
  
  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }

  ngOnInit(): void {
    //ngrx way to get user
    this.authUserSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      user = <User>user;
      this.isAuthenticated = user.token != null && user.token != '' ? true : false;
    });

    /*
    this.authUserSub = this.authService.userSub.subscribe(user => {
      user = <User>user;
      this.isAuthenticated = user.token != null && user.token != ''?true:false;
    });
    */

  }

  saveData() {
    this.dataAccessService.storeRecipes();
  }

  getData() {
    this.dataAccessService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }

}
