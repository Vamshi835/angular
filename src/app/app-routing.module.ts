import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingsComponent } from "./shoppings/shoppings.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
  { path: "", redirectTo:"/recipies", pathMatch:"full" },
  { path: "recipies", component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent, pathMatch:"full" },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailsComponent },
    { path: ':id/edit', component: RecipeEditComponent }
  ] },
  { path: "shoppings", component: ShoppingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
