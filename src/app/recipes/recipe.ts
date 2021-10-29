import { Ingredient } from './../shared/ingredient.model';
export class Recipie {
    public name:string;
    public description:string;
    public image:string;
    public ingredients: Ingredient[]

    constructor(name:string, desc:string, img:string, ingredients : Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.image = img;
        this.ingredients = ingredients;
    }
}