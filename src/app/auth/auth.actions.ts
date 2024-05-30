import { Action } from "@ngrx/store";

export const AUTHENTICATE = '[Auth] Authenticate';
export const UNAUTHENTICATE = '[Auth] Unauthenticate';

export class Authenticate implements Action {
  readonly type = AUTHENTICATE; // type is mandatory for an Action
}
export class Unauthenticate implements Action {
  readonly type = UNAUTHENTICATE; // type is mandatory for an Action
}

export type AuthActions = Authenticate | Unauthenticate;