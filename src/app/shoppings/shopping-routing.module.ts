import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ShoppingsComponent } from './shoppings.component';

const routes: Routes = [

    { path: "", component: ShoppingsComponent, canActivate: [AuthGuardService] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingRoutingModule { }