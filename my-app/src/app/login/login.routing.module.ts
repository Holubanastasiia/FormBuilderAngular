import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  declarations: [SignInComponent, SignUpComponent],
})
export class LoginRoutingModel {}
