import { NgModule } from '@angular/core';
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeItemComponent
    ],
    imports : [
        RecipeRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class RecipeModule { }