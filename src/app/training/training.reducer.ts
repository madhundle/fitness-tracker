import { Activity } from "./activity.model";
import { TrainingActions, SET_AVAILABLE_ACTIVITIES, SET_PAST_ACTIVITIES, START_ACTIVITY, STOP_ACTIVITY } from "./training.actions";
import * as fromRoot from "../app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
  availableActivities: Activity[],
  pastActivities: Activity[],
  currentActivity: Activity
};

// Because training is a lazy loaded module, we don't map this reducer in App;
// That would load it up front. Instead, we extend App here, 
export interface State extends fromRoot.State {
  activity: TrainingState;
}

const initialState: TrainingState = {
  availableActivities: [],
  pastActivities: [],
  currentActivity: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_ACTIVITIES:
      return { ...state, availableActivities: action.payload };
    case SET_PAST_ACTIVITIES:
      return { ...state, pastActivities: action.payload };
    case START_ACTIVITY:
      return { 
        ...state, 
        currentActivity: { ...state.availableActivities.find(act => act.id === action.payload) }
      };
    case STOP_ACTIVITY:
      return { ...state, currentActivity: null };
    default:
      return state;
  }
}

// utility function to get quick access to a particular state slice
export const getTrainingState = createFeatureSelector<TrainingState>('training');

// utility functions for quick access to particular state properties
// createSelector(function to return state, function to return property)
export const getAvailableActivities = createSelector(getTrainingState, (state: TrainingState) => state.availableActivities);
export const getPastActivities = createSelector(getTrainingState, (state: TrainingState) => state.pastActivities);
export const getCurrentActivity = createSelector(getTrainingState, (state: TrainingState) => state.currentActivity);
export const getIsCurrentlyTraining = createSelector(getTrainingState, (state: TrainingState) => state.currentActivity != null);
