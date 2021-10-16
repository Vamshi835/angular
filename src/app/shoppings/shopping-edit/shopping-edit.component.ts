import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  data: Ingredient = new Ingredient("", 0);
  @Output() addIngredientEmitter = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient() {
    this.addIngredientEmitter.emit(this.data);
  }

  clearIngredient() {
    var temp: Ingredient = new Ingredient("", 0);
    this.data = temp;
  }

  deleteIngredient() {
    console.log(this.data);
  }

}
