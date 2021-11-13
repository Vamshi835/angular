import { Component, Input, OnInit } from '@angular/core';
import { Recipie } from '../../recipe';
import { RecipeService } from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() id: any;
  public recipe: any;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.recipe = this.recipeService.getRecipes()[this.id];
    }
  }
}
