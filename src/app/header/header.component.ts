import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { DataAccessService } from "../shared/data-access.service";
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated:boolean = false;
  authUserSub!: Subscription;

  constructor(private dataAccessService: DataAccessService, private authService:AuthService) { }
  
  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authUserSub = this.authService.userSub.subscribe(user => {
      user = <User>user;
      this.isAuthenticated = user.token != null && user.token != ''?true:false;
    });
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
