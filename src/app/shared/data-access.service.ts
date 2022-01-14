import { ShoppingListState } from './shopping-list.reducer';
import { RecipeState } from './../recipes/store/recipe.reducer';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipie } from '../recipes/recipe';
import { Ingredient } from './ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { exhaustMap, map, take } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService implements OnDestroy {

  recipeURL: string = 'https://angular-demo-202e1-default-rtdb.firebaseio.com/recipes.json';
  recipeSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService : AuthService, private store : Store<AppState>) { }

  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  storeRecipes() {
    // const recipes = this.recipeService.getRecipes();
    let recipes:Recipie[] = [];
    this.recipeSubscription = this.store.select('recipe').subscribe((data : RecipeState) => {
      recipes = data.recipes;
    })
    console.log("storeRecipes - ", recipes)
    this.http.put(this.recipeURL, recipes)
    .subscribe(data => {
      console.log(data);
    });
  }

  storeShoppingList() {
    // const recipes = this.recipeService.getRecipes();
    const recipeURL: string = 'https://angular-demo-202e1-default-rtdb.firebaseio.com/ingredients.json'
    let ingredients:Ingredient[]= [];
    this.recipeSubscription = this.store.select('shoppingList').subscribe((data :ShoppingListState) => {
      ingredients = data.ingredients;
    })
    console.log("storeIngredients - ", ingredients)
    this.http.put(recipeURL, ingredients)
    .subscribe(data => {
      console.log(data);
    });
  }

  getRecipes() {
    let recipes: Recipie[] = [];
      this.http.get<Recipie[]>(this.recipeURL).pipe(map(recipes => {
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
