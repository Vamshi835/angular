import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Params } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeFormGroup : any;
  id:number = 0;
  editMode:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit(): void {

    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath: string = '';
    let ingredients = [];

    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = +param.id;
        this.editMode = true;
        console.log(this.id);
      }
    );

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.image;
      recipeDescription = recipe.description;
      ingredients = recipe.ingredients;

      console.log(recipe);
    }

    console.log(recipeName, recipeImagePath, recipeDescription);
    

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      image: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription)
    });

  }

  onSubmit() {
    console.log(this.recipeFormGroup);
  }

}
