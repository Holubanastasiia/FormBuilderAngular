import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuth()) {
      req = req.clone({
        //some trouble with setParams
        setParams: {
          // auth: this.authService.token,
        },
      });
    }
    return next.handle(req).pipe(
      tap(() => {
        console.log('intercept');
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('interseptor error', error);

        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login', 'signin']);
        }
        return throwError(error);
      })
    );
  }
}
