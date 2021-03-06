import { RecipeState } from './../recipes/store/recipe.reducer';
import { GetRecipies } from './../recipes/store/recipe.actions';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { DataAccessService } from "../shared/data-access.service";
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';

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

    // This is used to get the recipes from firebase
    // this.store.select('recipe').subscribe((data : RecipeState) => {
    //   if (data.recipes.length === 0) {
    //     this.store.dispatch(new GetRecipies()); 
    //   }
    // });

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
    // this.dataAccessService.getRecipes();
    this.store.dispatch(new GetRecipies());
  }

  logout() {
    // this.authService.logout();
    this.store.dispatch(new Logout());
  }

}
