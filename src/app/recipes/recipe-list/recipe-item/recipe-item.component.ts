import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipie } from '../../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Output() onRecipeCardSelected = new EventEmitter<void>();
  
  @Input() recipe: any;

  constructor() { }

  ngOnInit(): void {
  }

  recipeCardSelected() {
    this.onRecipeCardSelected.emit();
  }
}
