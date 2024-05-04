import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor (private authService: AuthService) {}

  ngOnInit() {
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

}
