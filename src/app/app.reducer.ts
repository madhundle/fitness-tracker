// Main Reducer for NgRx State Management
// Merges all reducers
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUIReducer from "./shared/ui.reducer";
import * as fromAuthReducer from "./auth/auth.reducer";

// map state slices
export interface State {
  ui: fromUIReducer.State;
  auth: fromAuthReducer.State;
}

// map reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuthReducer.authReducer
}

// utility functions to get quick access to a particular state slice
export const getUIState = createFeatureSelector<fromUIReducer.State>('ui');
export const getAuthState = createFeatureSelector<fromAuthReducer.State>('auth');

// utility functions to get quick access to a particular state property
// createSelector(function to return state, function to return property)
export const getIsLoading = createSelector(getUIState, fromUIReducer.getIsLoading);
export const getIsAuthenticated = createSelector(getAuthState, fromAuthReducer.getIsAuthenticated);