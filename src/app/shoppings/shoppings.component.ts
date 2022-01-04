import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from "./shopping-list.service";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.component.html',
  styleUrls: ['./shoppings.component.scss']
})
export class ShoppingsComponent implements OnInit {

  public ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onAddIngredientEmitter(data :Ingredient) {
    this.shoppingListService.addIngredient(data);
    this.shoppingListService.shoppingListChanged.subscribe(
      (list : Ingredient[]) => {
        this.ingredients =  list;
      }
    );
  }

}
