import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SimActivationService } from './sim-activation.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SimInfoService } from './sim-info.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { SimCardInformation, SimInfo } from '../models/simCardInfo.model';

describe('SimInfoService', () => {
  let simInfo: SimInfo;
    simInfo = {
      "SigmaProductID": "Koala",
      "SimCardNumber": 6666666666666,
      "LogicalResourceID": 1,
      "ProductDetails": '',
      "OfferDesc": ''
    }
    let expectedData:SimCardInformation;
     expectedData ={
      "ChannelOrderID": "305939305939305939",
      "EmailID": "testUser@hotmail.com",
      "SimInfo": [
        simInfo
      ]
    };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, HttpClientModule, HttpClientTestingModule
    ],
    providers: [
      SimInfoService,
      SimActivationService,
    ], 
  }));

  it('should be created', () => {
    const service: SimInfoService = TestBed.inject(SimInfoService);
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const service: SimInfoService = TestBed.inject(SimInfoService);
    expect(service.getSimInfo).toBeDefined();
  });

  it('should be created', () => {
    const service: SimInfoService = TestBed.inject(SimInfoService);
    expect(service.getSimInfoMock).toBeDefined();
  });

  it('#getSimInfo() should make a GET request', () => {
    const service: SimInfoService = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const simCardNumber = '6666666666666';
    const emailID = 'testUser@hotmail.com';
 
    service.getSimInfo(simCardNumber, emailID).subscribe(data => {
      expect(data.body).toEqual(expectedData);
    });
 
    const req = httpTestingController.expectOne(environment.getSimInfoEndpoint + '?SimNumber=' + simCardNumber + '&emailID=' + emailID);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
  });

  it('#getSimInfoMock() should make a GET request', () => {
    const service: SimInfoService = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const simCardNumber = 6666666666666;

    service.getSimInfoMock(simCardNumber).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    let req = httpTestingController.expectOne(environment.simInfoURL + simCardNumber + '.json');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
  });

  it( 'should handle an error on catchError...', () => {
    const service: SimInfoService = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const simCardNumber = '6666666666666';
    const emailID = 'testUser@hotmail.com';
		const errMsg = 'Invalid request parameters';
		const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({
			error: {}, status: 500, url: environment.getSimInfoEndpoint + '?SimNumber=' + simCardNumber + '&emailID=' + emailID, statusText: 'Bad Request' 
    });
    const mockErrorResponse1 = {
			error: 'Something bad happened; please try again later.',
      status: 500,
      url: environment.getSimInfoEndpoint + '?SimNumber=' + simCardNumber + '&emailID=' + emailID,
      statusText: 'Something bad happened; please try again later.',
      type: "network error"
    };

    service.getSimInfo(simCardNumber, emailID).subscribe((resp) => {
			console.log( 'handleError on create: expected error response:' );
		}, (error) => {
			expect(error.statusText).toEqual(mockErrorResponse.statusText);
		});
		const request: TestRequest = httpTestingController.expectOne(mockErrorResponse.url);
		expect( request.request.method ).toBe('GET');
		request.flush(errMsg, mockErrorResponse);

    service.getSimInfo(simCardNumber, emailID).subscribe((resp) => {
		}, (error) => {
			expect(error.error.type).toEqual(mockErrorResponse1.type);
		});
		const request1 = httpTestingController.expectOne(mockErrorResponse1.url).error(new ErrorEvent('network error'));
	});
});
