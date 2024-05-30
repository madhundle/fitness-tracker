import { Action } from "@ngrx/store";
import { Activity } from "./activity.model";

export const SET_AVAILABLE_ACTIVITIES = '[Training] Set Available Activities';
export const SET_PAST_ACTIVITIES = '[Training] Set Past Activities';
export const START_ACTIVITY = '[Training] Start Activity';
export const STOP_ACTIVITY = '[Training] Stop Activity';

export class SetAvailableActivities implements Action {
  readonly type = SET_AVAILABLE_ACTIVITIES; // type is mandatory for an Action
  constructor (public payload: Activity[]) {} // pass the activities as a payload
}
export class SetPastActivities implements Action {
  readonly type = SET_PAST_ACTIVITIES; // type is mandatory for an Action
  constructor (public payload: Activity[]) {} // pass the activities as a payload
}

export class StartActivity implements Action {
  readonly type = START_ACTIVITY;
  constructor (public payload: string) {} // pass the selectedId as a payload
}

export class StopActivity implements Action {
  readonly type = STOP_ACTIVITY;
}

export type TrainingActions = 
    SetAvailableActivities 
  | SetPastActivities 
  | StartActivity 
  | StopActivity;