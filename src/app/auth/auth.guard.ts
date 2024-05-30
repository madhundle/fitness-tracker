import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";

// Protect the Training route if not authenticated
// a guard must always return true, a Promise that resolves to true, or an Observable that resolves to true
@Injectable() // allow injection of the AuthService and Router
export class AuthGuard implements CanLoad {
  constructor ( private router: Router,
                private store: Store<fromRoot.State> ) {}

  // Replaced by Lazy Loading with canLoad
  // args: the route we're trying to active (nav to) and the current routing state
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   // if user is authenticated, allow access
  //   if (this.authService.getAuthStatus()) {
  //     return true;
  //   }
  //   // if not, redirect them to login
  //   else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  canLoad(route: Route) {
    // if user is authenticated, allow access
    // if user is not authenticated, redirect to login
    
    // replaced by NgRx state management
    // if (this.authService.getAuthStatus()) {
    return this.store.select(fromRoot.getIsAuthenticated).pipe(
      take(1),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}