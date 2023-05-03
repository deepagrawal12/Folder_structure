import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  language: string;

  constructor(public auth: AuthService, private router: Router, private cookie: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request)
    .pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            // console.log('Http Request : ' + event.url + ' Response  StatusCode :' + event.status);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              // console.log('Http Request : ' + error + ' Response Status Code :' + error.status);
              this.language = this.cookie.get('language');
              // this.router.navigate([this.language, 'access-denied']);
            }
          }
        }
      )
    );
  }
}
