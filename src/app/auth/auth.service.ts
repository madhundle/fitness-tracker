import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";
import * as UI from "../shared/ui.actions";
// import { User } from "./user.model"; // replaced by Firestore

@Injectable() // to inject the Router, Authentication, and other Services
export class AuthService {
  // private user: User; // the currently authenticated user, or null
  private authStatus = false; // boolean for if a user is authenticated
  authChange = new Subject<boolean>(); // let the app subscribe to login/logout
  // private auth = inject(Auth); // an alternative way to injecting in constructor

  constructor (private router: Router, 
               private auth: Auth, 
               private trainingService: TrainingService,
               private uiService: UIService,
               private store: Store<fromRoot.State>) {}

  // Sign up a new user
  signupUser(authData: AuthData) {
    // replaced by NgRx state management
    // this.uiService.loadingState.next(true);
    this.store.dispatch(new UI.StartLoading());

    // create our User
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
    .then(result => {
      console.log(result);
      // this.completeAuth();
      // this.uiService.loadingState.next(false);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      // this.uiService.loadingState.next(false);
      this.store.dispatch(new UI.StopLoading());
      console.log(error);
      console.log("error code:", error.code);
      console.log("error message:", error.message);
      if (error.code == "auth/email-already-in-use") {
        this.uiService.showSnackBar ("Account already exists for this email address", null, 3000);
      }
      else {
        this.uiService.showSnackBar("Error: " + error.code, null, 3000);
      }
    });

    // this.user = { // replaced by AngularFire
    //   email: authData.email,
    //   userId: String(Math.round(Math.random() * 10000))
    // }
  }
  
  // Login a User  
  loginUser(authData: AuthData) {
    // replaced by NgRx state management
    // this.uiService.loadingState.next(true);
    this.store.dispatch(new UI.StartLoading());

    // authenticate our User with the server
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
    .then(result => {
      console.log(result);
      // this.completeAuth();
      // this.uiService.loadingState.next(false);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      // this.uiService.loadingState.next(false);
      this.store.dispatch(new UI.StopLoading());
      console.log(error);
      console.log("error code:", error.code);
      console.log("error message:", error.message);
      if (error.code == "auth/invalid-credential") {
        this.uiService.showSnackBar("Invalid Credentials", null, 3000);
      }
      else {
        this.uiService.showSnackBar("Error: " + error.code, null, 3000);
      }
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