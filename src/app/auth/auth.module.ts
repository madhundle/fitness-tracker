import { NgModule } from "@angular/core";

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { MaterialModule } from "../material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { getAuth, provideAuth } from "@angular/fire/auth";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    provideAuth(() => getAuth()),

  ],
  exports: []
})
export class AuthModule {}