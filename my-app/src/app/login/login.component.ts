import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from './login.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  submitted = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rout.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, enter your data';
      } else if (params['authFailed']) {
        this.message = 'Session is end, You need to log in again';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
