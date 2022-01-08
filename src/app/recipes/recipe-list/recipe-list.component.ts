import { Subscription } from 'rxjs';
import { RecipeState } from './../store/recipe.reducer';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Recipie } from "../recipe";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipie[] = [];
  recipeSubscription : Subscription | undefined;

  constructor(private recipeService: RecipeService, private store : Store<AppState>) { }
  
  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.recipeSubscription = this.store.select('recipe').subscribe((data : RecipeState) => {
      console.log(data.recipes);
      this.recipes = data.recipes;
    });

    /*
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe(
      (data: Recipie[]) => {
        this.recipes = data;
      }
    );
    */

  }
}
