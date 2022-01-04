import { Action } from '@ngrx/store';
import { Ingredient } from './ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient : Ingredient;
    editedIngredientIndex : number;
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient("Tomatoes", 4),
    ],
    editedIngredient : new Ingredient('', 0),
    editedIngredientIndex : -1
};

export function shoppingListReducer(state: ShoppingListState = initialState,
    action: ShoppingListActions.shoppingListActions): ShoppingListState {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            let ingredients = [...state.ingredients]
            ingredients[state.editedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient : new Ingredient('', 0),
                editedIngredientIndex : -1 
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => igIndex !== state.editedIngredientIndex),
                editedIngredient: new Ingredient('', 0),
                editedIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload

            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                ingredients: [...state.ingredients],
                editedIngredient: new Ingredient('', 0),
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
