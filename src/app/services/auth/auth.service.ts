import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private cookie: CookieService) { }

  // public isAuthorized(): boolean {
  //   // Check is requried cookie value exist;if not, redirect to access denied page
  //   // this.cookie.set('ng-token', '$apr1$lxxaNKxA$vtXrs9021V2X7YUjuE5qP1');
  //   const ngCookie = this.cookie.get('ng-token');
  //   if (ngCookie === '$apr1$lxxaNKxA$vtXrs9021V2X7YUjuE5qP1') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // @TODO : Load token from Cookie
  getToken(): string {
    return this.cookie.get('jwt-token');
  }
}
