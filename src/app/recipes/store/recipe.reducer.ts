import { Action } from '@ngrx/store';
import { Recipie } from './../recipe';
import * as RecipeAction from './recipe.actions'

export interface RecipeState {
    recipes: Recipie[];
}

const intitalState : RecipeState = {
    recipes : []
}

export function recipesReducer(state = intitalState, action: RecipeAction.RecipeActions) : RecipeState {
    
    switch (action.type) {
        case RecipeAction.ADD_RECIPE:
            return {
                ...state,
                recipes : [...state.recipes, action.payload]
            };
        case RecipeAction.UPDATE_RECIPE:
            const recipes = [...state.recipes];
            recipes[action.payload.id] = action.payload.recipe;
            return {
                ...state,
                recipes : recipes
            };
        case RecipeAction.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            };
        case RecipeAction.CANCEL_EDIT:
            return {
                ...state
            };
        case RecipeAction.GET_RECIPES:
            return {
                ...state
            };
        case RecipeAction.ADD_ALL_RECIPES:
            return {
                ...state,
                recipes: [...state.recipes, ...action.payload]
            };
        case RecipeAction.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        default:
            return state;
    }
}