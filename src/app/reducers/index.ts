import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { ShoppingListState, shoppingListReducer } from '../shoppings/shopping-list.reducer'

export const rootReducer = {};

export interface AppState {
  shoppingList: ShoppingListState;
};


export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer
};


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
