import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  { path: "", redirectTo: "/recipies", pathMatch: "full" },
  { path: "recipies", loadChildren: () => import("./recipes/recipe.module").then(m => m.RecipeModule)},
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
