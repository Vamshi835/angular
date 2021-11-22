import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tamatoo", 5)
  ];

  public shoppingListChanged = new Subject<Ingredient[]>();

  constructor() { }

  /**
   * getIngredients
   */
  public getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredientList : Ingredient[]) {
    this.ingredients.push(...ingredientList);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

}
