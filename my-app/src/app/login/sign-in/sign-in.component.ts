import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public error$: Subject<string> = new Subject<string>();
  form!: FormGroup;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  login() {
    this.authService.signIn(this.form.value).subscribe(() => {
      this.form.reset();
      this.router.navigate(['login']);
    });
  }

  isAuth() {
    this.authService.isAuth();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['login', 'signin']);
  }
}
