import { DataAccessService } from './data-access.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, take, tap } from "rxjs/operators";
import { Ingredient } from "./ingredient.model";
import { AddIngredients, ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENT, GET_INGREDIENTS, UPDATE_INGREDIENT } from "./shopping-list.actions";

@Injectable()
export class ShoppingListeffects {

  @Effect()
    getIngredients = this.actions$.pipe(
        ofType(GET_INGREDIENTS),
        take(1),
        switchMap(()=>{
            const ingredientURL: string = 'https://angular-demo-202e1-default-rtdb.firebaseio.com/ingredients.json';
            return this.http.get<Ingredient[]>(ingredientURL).pipe(map((ingredients: Ingredient[]) => {
                return ingredients.map((ingredient: Ingredient) => {
                    return {
                        ...ingredient,
                        ingredients: ingredient != undefined && ingredient != null ? ingredient : new Ingredient('', 0)
                    }
                })
            }),
            map((response: Ingredient[]) => {
                return new AddIngredients(response)
            }))

        })
    );

    @Effect({dispatch : false})
    saveIngredients = this.actions$.pipe(
      ofType(ADD_INGREDIENTS, ADD_INGREDIENT, UPDATE_INGREDIENT, DELETE_INGREDIENT),
      tap(() => {
        this.dataService.storeShoppingList();
      })
    );


  constructor(private actions$: Actions, private router: Router, private activatedRoute: ActivatedRoute, private http:HttpClient, private dataService : DataAccessService) {}
}
