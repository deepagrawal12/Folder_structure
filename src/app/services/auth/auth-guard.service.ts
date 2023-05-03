import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private cookie: CookieService) { }

  canActivate(): boolean {
    // if (!this.auth.isAuthorized()) {
    //   // Route to access denied page or login page
    //   let language = 'fr';
    //   if (this.cookie.get('language')) {
    //     language = this.cookie.get('language');
    //   }
    //   this.router.navigate([
    //     '/' + language + '/page-not-found'
    //   ]);
    // }
    return true;
  }
}

