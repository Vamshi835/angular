import { GetRecipies } from './store/recipe.actions';
import { Component, OnInit } from '@angular/core';
import { Recipie } from './recipe';
import { RecipeService } from "../recipes/recipe.service";
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipe:any;

  constructor(private recipeService: RecipeService, private store : Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(new GetRecipies());
  }

}
