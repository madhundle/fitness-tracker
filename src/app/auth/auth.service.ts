import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable() // to inject the Router
export class AuthService {
  private user: User; // the currently authenticated user, or null
  authChange = new Subject<boolean>(); // let the app subscribe to login/logout

  constructor (private router: Router) {}

  // Sign up a new user
  signupUser(authData: AuthData) {
    // set up our User with their email and Id from the server
    this.user = {
      email: authData.email,
      userId: String(Math.round(Math.random() * 10000))
    }
    // tell the rest of the app
    this.authChange.next(true);
    // redirect appropriately
    this.router.navigate(['/training'])
  }
  
  // Login a User  
  loginUser(authData: AuthData) {
    // authenticate our User with the server
    this.user = {
      email: authData.email,
      userId: String(Math.round(Math.random() * 10000))
    }    
    // tell the rest of the app
    this.authChange.next(true);
    // redirect appropriately
    this.router.navigate(['/training'])
  }

  // Log the User out
  logoutUser() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  // Let the rest of the app get User info
  getUser() {
    // safely return a copy not a reference, so other parts of the app can't edit
    return { ...this.user };
  }

  // Let the rest of the app quickly check if there's a user currently authenticated
  isAuth() {
    return this.user != null;
  }
}