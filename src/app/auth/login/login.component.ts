import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { UIService } from '../../shared/ui.service';
// import { Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs';
// import { map } from 'rxjs-compat/operator/map';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  // replaced by NgRx state management
  // private loadingSub: Subscription;

  constructor (private authService: AuthService, 
              //  private uiService: UIService,
               private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    // Replaced by custom actions and utility functions
    // Without pipe, I get error: 'this.store.map is not a function'
    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    console.log(this.isLoading$);

    // replaced by NgRx state management
    // this.loadingSub = this.uiService.loadingState.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
  }

  // When a login form is submitted, login the user
  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.loginUser({
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
