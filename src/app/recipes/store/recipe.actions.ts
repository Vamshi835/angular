import { StartEdit } from './../../shared/shopping-list.actions';
import { Recipie } from './../recipe';

export const ADD_RECIPE = "[Recipe] ADD";
export const UPDATE_RECIPE = "[Recipe] UPDATE";
export const DELETE_RECIPE = "[Recipe] DELETE";
export const GET_RECIPES = "[Recipe] GET";
export const CANCEL_EDIT = "[Recipe] CANCEL_EDIT";
export const ADD_ALL_RECIPES = "[Recipe] ADD_ALL";
export const SET_RECIPES = "[Recipe] SET";

export type RecipeActions = AddRecipe | UpdateRecipe | DeleteRecipe | CancelRecipeEdit | GetRecipies | AddAllRecipies | SetRecipes;

export class AddRecipe {
    readonly type = ADD_RECIPE
    constructor(public payload : Recipie) {}
}

export class UpdateRecipe {
    readonly type = UPDATE_RECIPE
    constructor(public payload: {id : number, recipe :Recipie}) { }
}

export class DeleteRecipe {
    readonly type = DELETE_RECIPE
    constructor(public payload: number) { }
}

export class CancelRecipeEdit {
    readonly type = CANCEL_EDIT
}

export class GetRecipies {
    readonly type = GET_RECIPES
}

export class AddAllRecipies {
    readonly type = ADD_ALL_RECIPES
    constructor(public payload : Recipie[]){}
}

export class SetRecipes {
    readonly type = SET_RECIPES
    constructor(public payload: Recipie[]) { }
}