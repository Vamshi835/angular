import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tamatoo", 5),
    new Ingredient("PineApple", 5),
    new Ingredient("Carrot", 5)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
