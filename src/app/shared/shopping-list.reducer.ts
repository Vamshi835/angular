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
            let id: number = action.payload.index;
            let data: Ingredient = action.payload.ingredient;
            let ingredients = [...state.ingredients]
            ingredients[id] = data;
            return {
                ...state,
                ingredients: ingredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => igIndex !== action.payload)
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
