import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from "./shopping-list.service";
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { GetIngredients } from '../shared/shopping-list.actions';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.component.html',
  styleUrls: ['./shoppings.component.scss']
})
export class ShoppingsComponent implements OnInit {

  public ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService, private store : Store<AppState>) { }

  ngOnInit(): void {
    // this.ingredients = this.shoppingListService.getIngredients();
    this.store.dispatch(new GetIngredients());
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
