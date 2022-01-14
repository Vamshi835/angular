import { HttpClient } from '@angular/common/http';
import { ofType } from '@ngrx/effects';
import { tap, switchMap, map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect} from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { CANCEL_EDIT, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, GET_RECIPES, AddAllRecipies, SetRecipes } from './recipe.actions';
import { Recipie } from '../recipe';

@Injectable()
export class RecipeEffects {

    @Effect({dispatch : false})
    cancelEdit = this.actions$.pipe(
        ofType(CANCEL_EDIT, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE),
        tap(() => {
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        })
    );

    @Effect()
    getRecipies = this.actions$.pipe(
        ofType(GET_RECIPES),
        take(1),
        switchMap(()=>{
            const recipeURL: string = 'https://angular-demo-202e1-default-rtdb.firebaseio.com/recipes.json';
            return this.http.get<Recipie[]>(recipeURL).pipe(map((recipes: Recipie[]) => {
                return recipes.map((recipe: Recipie) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients != undefined && recipe.ingredients != null ? recipe.ingredients : []
                    }
                })
            }),
            map((response: Recipie[]) => {
                return new SetRecipes(response);
            }))

        })
    );

    constructor(private actions$: Actions, private router: Router, private activatedRoute: ActivatedRoute, private http:HttpClient) { }
}
