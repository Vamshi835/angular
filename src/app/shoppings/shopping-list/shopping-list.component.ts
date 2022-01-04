import { Ingredient } from './../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from "../shopping-list.service";
import { from, Observable } from 'rxjs';
import { ShoppingListState } from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: any = [];
  ingredients$: any;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{ 'shoppingList': ShoppingListState}>) { }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((list: ShoppingListState) => {
      console.log("data ", list);
      this.ingredients = list.ingredients;
    });
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListService.shoppingListChanged.subscribe(
    //   (data: Ingredient[]) => {
    //     this.ingredients = data;
    //   }
    // );
  }

  editItem(id:number) {
    this.shoppingListService.shoppingEditIndex.next(id);
  }

}
