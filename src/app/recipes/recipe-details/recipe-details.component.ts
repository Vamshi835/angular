import { Ingredient } from './../../shared/ingredient.model';
import { Recipie } from './../recipe';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from "../../shared/shopping-list.actions";
import { AppState } from 'src/app/reducers';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

  recipe: any;
  id:number = 0;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params.subscribe(
      (param : Params) => {
        this.id = +param.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
    

  }

  addIngredientToShoppingList() {
    if (this.recipe.ingredients.length > 0) {
      // this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
      this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);

    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
