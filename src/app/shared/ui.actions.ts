import { Action } from "@ngrx/store";

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export class StartLoading implements Action {
  readonly type = START_LOADING; // type is mandatory for an Action
}
export class StopLoading implements Action {
  readonly type = STOP_LOADING; // type is mandatory for an Action
}

export type UIActions = StartLoading | StopLoading;