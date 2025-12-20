import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';

export const routes: Routes = [
  { path: "register", component: SignupComponent },
  { path: "login", component: LoginComponent }
];
