// Main Reducer for NgRx State Management
// Merges all reducers
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUIReducer from "./shared/ui.reducer";

// map our state slices
export interface State {
  ui: fromUIReducer.State;
}

// map our reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUIReducer.uiReducer
}

// utility function to get quick access to a particular state slice
export const getUIState = createFeatureSelector<fromUIReducer.State>('ui');

// utility function to get quick access to a particular state property
// createSelector(function to return state, function to return property)
export const getIsLoading = createSelector(getUIState, fromUIReducer.getIsLoading);