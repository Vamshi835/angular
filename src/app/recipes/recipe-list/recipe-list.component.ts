import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipie } from "../recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipie>();

  recipes: Recipie[] = [
    new Recipie("Test Recipie - 1", "Total Timeunder 1 hour One Pot MealYes Recipe CourseMain Course Dietary ConsiderationEgg - free, Gluten - free, Halal, Lactose - free, Peanut Free, Soy Free, Tree Nut Free MealDinner Taste and TextureCreamy, Savory, Spiced    Ingredients : 1) (1¾-pound / 800 - gram) chicken, skinned and cut into 12 pieces¼ cup(50 ml) vegetable oil 2) 1 teaspoon garam masala", "https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg"),
    new Recipie("Test Recipie - 2", "Test descp", "https://www.thespruceeats.com/thmb/cO72JFFH0TCAufENSxUfqE8TmKw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg"),
    new Recipie("Test Recipie - 3", "Test descp", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeCardSelected(rec : Recipie) {
    this.recipeSelected.emit(rec);    
  }
}
