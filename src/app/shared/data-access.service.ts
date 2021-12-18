import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipie } from '../recipes/recipe';
import { Ingredient } from './ingredient.model';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  recipeURL: string = 'https://angular-demo-202e1-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService : AuthService) { }
  
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log("storeRecipes - ", recipes)
    this.authService.userSub.pipe(take(1), exhaustMap(user => {
      return this.http.put(this.recipeURL + "?auth="+user.token, recipes);
    }))
    .subscribe(data => {
      console.log(data);
    });
  }

  getRecipes() {
    let recipes: Recipie[] = [];
    this.authService.userSub.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipie[]>(this.recipeURL, {
        params : new HttpParams().set('auth', user.token + "")
      });
    }), map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients != undefined && recipe.ingredients != null ? recipe.ingredients : []
        }
      })
    }))
    .subscribe(data => {
      this.recipeService.setRecipes(data);
      recipes = data;
    });

    return recipes;
  }

}
