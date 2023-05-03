import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError'
import { SimCardInformation } from '../models/simCardInfo.model';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SimInfoService {

  /**
  * Implements Constructor
  *  @param http
  */
  constructor(private http: HttpClient) { }

  /**
  * @function getSimInfo: get sim data from sim information JSON
  * @param simCardNumber: pass the SIM Card number to service
  * @param emailID: pass the Email ID to service
  */
  getSimInfo(simCardNumber: string, emailID: string): Observable<Config> {
    simCardNumber = simCardNumber.replace(/\s/g, '');
    return this.http.get<any>(environment.getSimInfoEndpoint + '?SimNumber=' + simCardNumber + '&emailID=' +
    emailID, {observe: 'response'})
      .pipe(
        map(result => result),
        catchError(this.handleError)
      );
  }

  /**
  * @function getSimInfoMock: get sim data from sim information local JSON
  */
  getSimInfoMock(simCardNumber: number): Observable<SimCardInformation> {
    return this.http.get<SimCardInformation>(environment.simInfoURL + simCardNumber + '.json')
      .pipe(
        map(result => result),
        catchError(this.handleError)
      );
  }

  /********************End Review Order Block Section****************/

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
     error );
  }

}
