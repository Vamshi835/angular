import { Ingredient } from './../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from "../shopping-list.service";
import { Subscription } from 'rxjs';
import { ShoppingListState } from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: any = [];
  parentSubscription :Subscription = new Subscription();

  constructor(private shoppingListService: ShoppingListService, private store: Store<{ 'shoppingList': ShoppingListState}>) { }
  
  ngOnDestroy(): void {
    this.parentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.parentSubscription = this.store.select('shoppingList').subscribe((list: ShoppingListState) => {
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
