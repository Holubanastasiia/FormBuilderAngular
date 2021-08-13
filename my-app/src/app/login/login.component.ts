import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  message!: string;
  constructor(public authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  isAuth() {
    this.authService.isAuth();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.route.navigate(['login', 'signin']);
  }
}
