import { Component, OnInit } from '@angular/core';
import { Recipie } from './recipe';
import { RecipeService } from "../recipes/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipe:any;

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeEmitter.subscribe(
      (recipe : Recipie) => {
        this.recipe = recipe;
      }
    );
  }

  ngOnInit(): void {
  }

}
