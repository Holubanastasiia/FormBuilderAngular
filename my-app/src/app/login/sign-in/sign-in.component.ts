import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  message!: string;

  constructor(private rout: ActivatedRoute, private authService: AuthService) {} // private rout: ActivatedRoute, private authService: AuthService

  ngOnInit(): void {
    this.rout.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, enter your data';
      } else if (params['authFailed']) {
        this.message = 'Session is end, You need to log in again';
      }
    });

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  loginUser() {
    this.authService.signIn(this.form.value);
  }
}
