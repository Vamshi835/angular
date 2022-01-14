import { AuthService } from './auth/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { AppState } from './reducers';
import { Store } from '@ngrx/store';
import { AutoLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'food-cart-project';
  loadFeature = 'reciepe';

  constructor(private authService:AuthService, private store : Store<AppState>,
    @Inject(PLATFORM_ID) private platformId : any) {
    
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      // this.authService.autoLogin();
      this.store.dispatch(new AutoLogin()); 
    }
  }


}
