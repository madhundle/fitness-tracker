import { AuthActions, AUTHENTICATE, UNAUTHENTICATE } from "./auth.actions";

export interface State {
  isAuthenticated: boolean
};

const initialState: State = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTHENTICATE:
      return { isAuthenticated: true };
    case UNAUTHENTICATE:
      return { isAuthenticated: false };
    default:
      return state;
  }
}

// utility function for quick access to a state property
export const getIsAuthenticated = (state: State) => state.isAuthenticated;