import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post('', user);
  }

  logout() {}

  isAuth(): boolean {
    return true;
  }
}
