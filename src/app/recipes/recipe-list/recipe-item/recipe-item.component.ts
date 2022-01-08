import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Recipie } from '../../recipe';
import { RecipeService } from "../../recipe.service";
import { RecipeState } from '../../store/recipe.reducer';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit, OnDestroy {

  @Input() id: any;
  public recipe: any;
  recipeSubscription : Subscription | undefined;

  constructor(private recipeService: RecipeService, private store : Store<AppState>) { }
  
  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      // this.recipe = this.recipeService.getRecipes()[this.id];
      this.recipeSubscription = this.store.select('recipe').subscribe((data : RecipeState) => {
        this.recipe = data.recipes[this.id];
        console.log("recipe - ", this.recipe);
        
      });
    }
  }
}
