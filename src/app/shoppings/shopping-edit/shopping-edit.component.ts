import { ShoppingListState } from 'src/app/shared/shopping-list.reducer';
import { UpdateIngredient, DeleteIngredient, StopEdit } from './../../shared/shopping-list.actions';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient} from '../../shared/ingredient.model';
import { AddIngredient } from '../../shared/shopping-list.actions';
import { ShoppingListService } from "../shopping-list.service";
import { AppState } from 'src/app/reducers';

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


  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState> ) { }
  
  ngOnDestroy(): void {
    
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
      this.store.dispatch(new StopEdit());
    }
  }

  ngOnInit(): void {

    this.subscription = this.store.select('shoppingList').subscribe((data : ShoppingListState) => {
      const id : number = data.editedIngredientIndex;
      if (id > -1) {
        this.editMode = true;
        this.editIndex = id;
        this.form.setValue(
          {
            name: data.editedIngredient.name,
            amount: data.editedIngredient.amount

          });
      } else {
        this.editMode = false;
      }
    });

    /*
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
    */

  }

  addIngredient(form : NgForm) {
    const val = form.value;
    let data:Ingredient= new Ingredient('', 0);
    data.amount = val ['amount'];
    data.name = val['name'];

    if (this.editMode) {
      // this.shoppingListService.updateIngredients(this.editIndex, data);
      this.store.dispatch(new UpdateIngredient(data));
    } else
    // this.shoppingListService.addIngredient(data);
      this.store.dispatch(new AddIngredient(data));

    this.clearIngredient(this.form);
  }

  clearIngredient(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }

  deleteIngredient() {
    // this.shoppingListService.deleteIngredients(this.editIndex);
    this.store.dispatch(new DeleteIngredient());
    this.clearIngredient(this.form);
  }

}
