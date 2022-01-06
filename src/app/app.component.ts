import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService, private store : Store<AppState>) {
    
  }

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AutoLogin());
  }


}
