import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimInfoService } from './services/sim-info.service';
import { SimActivationService } from "./services/sim-activation.service";

// Common Modules
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './common/access-denied/access-denied.component';
import { SimNumberDirective } from './directive/sim-number.directive';
import {CookieService} from 'ngx-cookie-service';

/** Interceptors  */
import { TokenInterceptor } from './services/auth/token.interceptor';
import { HttpXsrfInterceptor } from './services/auth/httpxsrf.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    BrowserAnimationsModule,

  ],
  providers: [
    SimInfoService,
    SimActivationService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpXsrfInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
