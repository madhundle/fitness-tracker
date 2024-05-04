import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (private authService: AuthService) {}

  // When a login form is submitted, login the user
  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.loginUser({
      email: form.value.email,
      password: form.value.password
    });
  }


}
