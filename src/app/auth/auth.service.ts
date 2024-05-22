import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";
// import { User } from "./user.model"; // replaced by Firestore

@Injectable() // to inject the Router, Authentication, and other Services
export class AuthService {
  // private user: User; // the currently authenticated user, or null
  private authStatus = false; // boolean for if a user is authenticated
  authChange = new Subject<boolean>(); // let the app subscribe to login/logout
  // private auth = inject(Auth); // an alternative way to injecting in constructor

  constructor (private router: Router, 
               private auth: Auth, 
               private trainingService: TrainingService) {}

  // Sign up a new user
  signupUser(authData: AuthData) {
    // create our User
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
    .then(result => {
      console.log(result);
      // this.completeAuth();
    })
    .catch(error => {
      console.log(error);
    });

    // this.user = { // replaced by AngularFire
    //   email: authData.email,
    //   userId: String(Math.round(Math.random() * 10000))
    // }
  }
  
  // Login a User  
  loginUser(authData: AuthData) {
    // authenticate our User with the server
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
    .then(result => {
      console.log(result);
      // this.completeAuth();
    })
    .catch(error => {
      console.log(error);
    })

    // this.user = { // replaced by AngularFire
    //   email: authData.email,
    //   userId: String(Math.round(Math.random() * 10000))
    // }    
  }

  // replaced by authState listener
  // Complete authentication after sign up or log in
  // completeAuth() {
  //   this.authStatus = true;
  //   // if successful, tell the rest of the app
  //   this.authChange.next(true);
  //   // redirect appropriately
  //   this.router.navigate(['/training'])
  // }

  // most functions replaced by authState listener
  // Log the User out
  logoutUser() {
    signOut(this.auth);
    // if this is in the listener, it gets called right away when the listener is first initialized
    this.trainingService.cancelSubs();
    // this.user = null; // replaced by Firestore
    // this.trainingService.cancelSubs();
    // this.authStatus = false;
    // this.authChange.next(false);
    // this.router.navigate(['/']);
  }

  // replaced by Firestore
  // Let the rest of the app get User info
  // getUser() {
    // safely return a copy not a reference, so other parts of the app can't edit
    // return { ...this.user };
  // }

  // Let the rest of the app quickly check if there's a user currently authenticated
  getAuthStatus() {
    // return this.user != null; // replaced by Firestore
    return this.authStatus;
  }

  // Listen to auth changes and respond appropriately
  initAuthListener() {
    authState(this.auth).subscribe(user => {
      // For a valid user, complete authentication
      if (user) {
        this.authStatus = true;
        // if successful, tell the rest of the app
        this.authChange.next(true);
        // redirect appropriately
        this.router.navigate(['/training'])
      }

      // On first initialization or log out, no authentication
      else {
        this.authStatus = false;
        this.authChange.next(false);
        this.router.navigate(['/']);
      }
    });
  }
}