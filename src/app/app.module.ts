import { RecipeEffects } from './recipes/store/recipe.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppRoutingModule } from './app-routing.module';
import { RecipeModule } from "./recipes/recipe.module";
import { ShoppingModule } from "./shoppings/shopping.module";
import { AuthModule } from "./auth/auth.module";
import { reducers } from "./reducers/index";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { environment } from './../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModule,
    ShoppingModule,
    AuthModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({logOnly : environment.production})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
