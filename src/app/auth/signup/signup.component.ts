import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  maxDate;
  // isLoading = false; // replaced by NgRx state management
  isLoading$: Observable<boolean>;
  // private loadingSub: Subscription;

  constructor (private authService: AuthService, 
              //  private uiService: UIService,
               private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // replaced by NgRx state management
    // this.loadingSub = this.uiService.loadingState.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });

    // just setting it to today's date means no future date can be selected
    this.maxDate = new Date();
    // subtracting 18 years means you must be at least 18 years old to sign up
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // When a signup form is submitted, sign up the new user
  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.signupUser({ 
      email: form.value.email, 
      password: form.value.password
    });
  }

  // ngOnDestroy(): void {
  //   if (this.loadingSub) {
  //     this.loadingSub.unsubscribe();
  //   }
  // }
}
