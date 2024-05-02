import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  maxDate;

  ngOnInit() {
    // just setting it to today's date means no future date can be selected
    this.maxDate = new Date();
    // subtracting 18 years means you must be at least 18 years old to sign up
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
