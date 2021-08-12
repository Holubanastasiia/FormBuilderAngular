import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Sign-in
  signIn(authenticate: User): Observable<any> {
    return this.http.post('http://localhost:3000/login', authenticate);
  }

  signUp(authenticate: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', authenticate);
  }
}
