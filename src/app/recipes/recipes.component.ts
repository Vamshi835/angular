import { Component, OnInit } from '@angular/core';
import { Recipie } from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipe:any;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeCardSelected(recipe: Recipie) {
    this.recipe = recipe;
  }

}
