import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SimActivationService } from './sim-activation.service';
import { SimInfoService } from './sim-info.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { SimInformation } from '../models/sim-activation.model';
import { Observable, of, Subscription } from 'rxjs';

describe('SimActivationService', () => {
  let  outputData: SimInformation = {
        "ChannelOrderID": "1",
        "SimInfo": [ 123456 ]
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
    const service: SimActivationService = TestBed.inject(SimActivationService);
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const service: SimActivationService = TestBed.inject(SimActivationService);
    expect(service.simActivation).toBeDefined();
  });

  it('should be created', () => {
    const service: SimActivationService = TestBed.inject(SimActivationService);
    expect(service.simActivationMock).toBeDefined();
  });

  it('#simActivationMock() should make a GET request', () => {
    const service: SimActivationService = TestBed.inject(SimActivationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.simActivationMock().subscribe(data => {
      expect(data).toEqual([outputData]);
    });
 
    const req = httpTestingController.expectOne(environment.simActivationDetailsURL);
    expect(req.request.method).toEqual('GET');
    req.flush([outputData]);
  });

  it('#simActivation() should make a POST request', () => {
    const service: SimActivationService = TestBed.inject(SimActivationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.simActivation(outputData).subscribe(data => {
      expect(data).toEqual([outputData]);
    });

    let req = httpTestingController.expectOne(environment.ActivateSimEndpoint);
    expect(req.request.method).toEqual('POST');
    req.flush([outputData]);
  });

  it( 'should handle an error on catchError...', () => {
    const service: SimActivationService = TestBed.inject(SimActivationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
		const errMsg = 'Invalid request parameters';
		const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({
			error: {}, status: 400, url: environment.ActivateSimEndpoint, statusText: 'Something bad happened; please try again later.' 
    });
    const mockErrorResponse1 = {
			error: 'Something bad happened; please try again later.',
      status: 500,
      url: environment.ActivateSimEndpoint,
      statusText: 'Something bad happened; please try again later.' 
    };

    service.simActivation(outputData).subscribe((resp) => {
		}, (error) => {
			expect(error).toEqual(mockErrorResponse.statusText);
		});
		const request: TestRequest = httpTestingController.expectOne(mockErrorResponse.url);
		expect( request.request.method ).toBe('POST');
		request.flush(errMsg, mockErrorResponse);

    let test = service.simActivation(outputData).subscribe((resp) => {
		}, (error) => {
			expect(error).toEqual(mockErrorResponse1.statusText);
		});
		const request1 = httpTestingController.expectOne(mockErrorResponse1.url).error(new ErrorEvent('network error'));
	});
});

function done() {
  throw new Error('Function not implemented.');
}

