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
  public shoppingEditIndex = new Subject<number>();

  constructor() { }

  /**
   * getIngredients
   */
  public getIngredients() {
    return this.ingredients.slice();
  }

  public getIngredient(id:number) {
    return this.ingredients[id];
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredientList : Ingredient[]) {
    this.ingredients.push(...ingredientList);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  updateIngredients(id:number,ingredient: Ingredient) {
    this.ingredients[id] = ingredient;
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  deleteIngredients(id: number) {
    this.ingredients.splice(id, 1);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

}
