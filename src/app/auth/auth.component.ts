import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  errorMsg:string  = "";
  parentSub!: Subscription;
  
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  
  ngOnDestroy(): void {
    if (this.parentSub) this.parentSub.unsubscribe();
  }

  ngOnInit(): void {
  }

  switchLogin() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm) {

    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    let obj :Observable < AuthResponse>;

    let values = form.value;
    if (!this.isLoginMode) {
      obj = this.authService.signUp(values.email, values.password);
    } else {
      obj = this.authService.login(values.email, values.password);
    }
    
    this.parentSub = obj.subscribe(data => {
      console.log(data);
      this.isLoading = false;

      if (this.isLoginMode) {
        this.toastr.success("User login successfully!!!");
      } else {
        this.toastr.success("User signup successfully!!!");
      }

      this.router.navigate(['./recipies'])
    }, (err: any) => {
      console.error("Error - ", err);
      this.isLoading = false;
      // this.errorMsg = "Error occured - " + err;
      this.toastr.error("Error: " + err);
    });

    form.reset();
  }

}
