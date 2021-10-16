import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.component.html',
  styleUrls: ['./shoppings.component.scss']
})
export class ShoppingsComponent implements OnInit {

  public ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tamatoo", 5)
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredientEmitter(data :Ingredient) {
    this.ingredients.push(data);
  }

}
