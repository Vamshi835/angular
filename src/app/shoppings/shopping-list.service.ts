import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tamatoo", 5)
  ];

  public shoppingListChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  /**
   * getIngredients
   */
  public getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    this.shoppingListChanged.emit(this.ingredients.slice());
  }

}