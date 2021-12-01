import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Recipie } from '../recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeFormGroup : any;
  id:number = 0;
  editMode:boolean = false;
  parentSubscription : Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router:Router) {
  }

  ngOnDestroy(): void {
    this.parentSubscription.unsubscribe();
  }

  ngOnInit(): void {

    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath: string = '';
    let recipeIngredients = new FormArray([]);

    this.parentSubscription = this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = +param.id;
        this.editMode = true;
        console.log(this.id);

        if (this.id == undefined || isNaN(this.id)) {
          this.editMode = false;
        }

      }
    );

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.image;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
       for (let ingredient of recipe.ingredients) {
         recipeIngredients.push(
            new FormGroup({
              name : new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
         );
       } 
      }

      console.log(recipe);
    }

    // console.log(recipeName, recipeImagePath, recipeDescription);
    

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      image: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients
    });

  }

  onSubmit() {
    console.log(this.recipeFormGroup);
    // const recipe = new Recipie(
    //   this.recipeFormGroup.value['name'], 
    //   this.recipeFormGroup.value['description'], 
    //   this.recipeFormGroup.value['image'],
    //   this.recipeFormGroup.value['ingredients']
    // );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeFormGroup.value);
    } else {
      this.recipeService.addRecipe(this.recipeFormGroup.value);
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeFormGroup.get('ingredients')).push(
      new FormGroup({
        name : new FormControl(null, [Validators.required]),
        amount : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index : number) {
    console.log("List - ", index);
    (<FormArray>this.recipeFormGroup.get('ingredients')).removeAt(index);
  }

}
