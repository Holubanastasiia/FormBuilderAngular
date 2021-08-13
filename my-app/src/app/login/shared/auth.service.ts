import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from './interfaces';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  public authState$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('user');
  }

  // Sign-in
  signIn(authenticate: User): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/login', authenticate)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  //for future
  // signUp(authenticate: User): Observable<User> {
  //   return this.http.post<User>('http://localhost:3000/users', authenticate);
  // }

  logout() {
    this.authState$.next(true);
    this.setToken(null);
  }

  isAuth(): boolean {
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
      localStorage.setItem('user', JSON.stringify(response));
    } else {
      localStorage.clear();
    }
  }
}
