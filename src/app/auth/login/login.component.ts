import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub: Subscription;

  constructor (private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingState.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  // When a login form is submitted, login the user
  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.loginUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

}
