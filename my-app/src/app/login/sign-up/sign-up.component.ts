import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  message!: string;

  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //validators
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  registerUser() {
    // this.authService.signUp(this.form.value).subscribe((res: any) => {
    //   if (res) {
    //     console.log(res);
    //     this.form.reset();
    //     this.router.navigate(['login/', 'sign-in']);
    //   }
    // });
  }
}
