import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: any;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.shoppingListChanged.subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
  }

  editItem(id:number) {
    this.shoppingListService.shoppingEditIndex.next(id);
  }

}
