import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  editMode:boolean = false;
  editIndex: any;
  subscription: any;

  @ViewChild('shoppingForm') form :any;


  constructor(private shoppingListService: ShoppingListService) { }
  
  ngOnDestroy(): void {
    
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.shoppingEditIndex.subscribe(
      (index : number) => {
        this.editMode = true;
        this.editIndex = index;
        console.log(this.editIndex)

        let data = this.shoppingListService.getIngredient(this.editIndex);
        this.form.setValue(
          {
            name: data.name,
            amount: data.amount

          });
        } 
    );
  }

  addIngredient(form : NgForm) {
    const val = form.value;
    let data:Ingredient= new Ingredient('', 0);
    data.amount = val ['amount'];
    data.name = val['name'];

    if (this.editMode) {
      this.shoppingListService.updateIngredients(this.editIndex, data);
    } else
    this.shoppingListService.addIngredient(data);

    this.clearIngredient(this.form);
  }

  clearIngredient(form: NgForm) {
    form.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    // console.log(this.data);
    this.shoppingListService.deleteIngredients(this.editIndex);
    this.clearIngredient(this.form);
  }

}