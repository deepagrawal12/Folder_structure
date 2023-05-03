import { HttpRequest, HttpInterceptor, HttpXsrfTokenExtractor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

constructor(private tokenExtractor: HttpXsrfTokenExtractor, private route: Router) {
}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
const headerName = 'X-XSRF-TOKEN';
const token = this.tokenExtractor.getToken();
if (token !== null && !req.headers.has(headerName)) {
req = req.clone({ headers: req.headers.set(headerName, token) });
}
return next.handle(req);
}
}
