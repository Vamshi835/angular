import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RecipeModule } from "./recipes/recipe.module";
import { ShoppingModule } from "./shoppings/shopping.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./reducers/index";

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
    StoreModule.forRoot(reducers)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
