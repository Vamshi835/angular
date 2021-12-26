import { NgModule } from '@angular/core';
import { ShoppingsComponent } from "./shoppings.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingRoutingModule } from './shopping-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations : [
        ShoppingsComponent,
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports : [
        ShoppingRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShoppingModule {}