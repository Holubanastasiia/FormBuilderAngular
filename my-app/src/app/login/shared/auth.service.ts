import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from './interfaces';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('user');
  }

  // Sign-in
  signIn(authenticate: User): Observable<User> {
    console.log(authenticate);

    return this.http
      .post<User>('http://localhost:3000/login', authenticate)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  signUp(authenticate: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', authenticate);
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    // return !!this.token;
    return this.token !== null ? true : false;
  }

  handleError(error: any) {
    let { message } = error;
    console.log(message);
    this.error$.next('Incorrect username or password!');
    return throwError(error);
  }

  private setToken(response: any) {
    if (response) {
      console.log('response', response);

      localStorage.setItem('user', JSON.stringify(response));
      console.log(localStorage.getItem('user'));
    } else {
      localStorage.clear();
    }
  }
}
