import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

// Protect the Training route if not authenticated
// a guard must always return true, a Promise that resolves to true, or an Observable that resolves to true
@Injectable() // allow injection of the AuthService and Router
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) {}

  // args: the route we're trying to active (nav to) and the current routing state
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if user is authenticated, allow access
    if (this.authService.isAuth()) {
      return true;
    }
    // if not, redirect them to login
    else {
      this.router.navigate(['/login']);
    }
  }

}