import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { ShoppingListState, shoppingListReducer } from '../shared/shopping-list.reducer'
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { recipesReducer, RecipeState } from '../recipes/store/recipe.reducer';

export const rootReducer = {};

export interface AppState {
  shoppingList: ShoppingListState;
  auth : AuthState;
  recipe: RecipeState;
};


export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipe: recipesReducer
};


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
