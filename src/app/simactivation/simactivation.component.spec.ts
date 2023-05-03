import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpLoaderFactory } from 'src/shared/shared.module';

import { SimactivationComponent } from './simactivation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SimInfoService } from '../services/sim-info.service';
import { SimActivationService } from '../services/sim-activation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimCardInformation, SimInfo } from '../models/simCardInfo.model';
import { SimInformation } from '../models/sim-activation.model';
import { By } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

describe('SimactivationComponent', () => {
  let component: SimactivationComponent;
  let fixture: ComponentFixture<SimactivationComponent>;
  let inputEl: DebugElement;
  let httpClient: HttpClient;
  
  let expectedValue = {
    "ChannelOrderID": "305939305939305939",
    "EmailID": "testUser@hotmail.com",
    "SimInfo": [
        {
            "SigmaProductID": "Koala",
            "LogicalresourceID": "0498555555",
            "SimCardNumber": "6666666666666"
        },
        {
            "SigmaProductID": "Eagle",
            "LogicalresourceID": "0498233449",
            "SimCardNumber": "7777777777777"
        }
    ]
  };
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
        {
          "SigmaProductID": "Koala",
          "SimCardNumber": 6666666666666,
          "LogicalResourceID": 1,
          "ProductDetails": '',
          "OfferDesc": ''
        },
        {
          "SigmaProductID": "Koala",
          "SimCardNumber": 6666666666666,
          "LogicalResourceID": 1,
          "ProductDetails": '',
          "OfferDesc": ''
        }
      ]
    };

  let outputData: SimInformation;
    outputData = {
          "ChannelOrderID": "1",
          "SimInfo": [ 1234567 ]
    }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimactivationComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })        
      ],
      providers: [
        CookieService, TranslateService, SimInfoService, SimActivationService, HttpClient  
      ]       
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call initializeForm() on init method',()=>{
    spyOn(component,'initializeForm').and.callThrough();
    component.ngOnInit();
    expect(component.initializeForm).toHaveBeenCalled()
  });

  it('Test a Form Group ELEMENT count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });

  it('Check Initial Form Values For SIM ACTIVATION FORM GROUP', () => {
    const simActivationFormGroup = component.simActivationForm;
    const simActivationFormValues = {
      simNumber: '',
      emailAddress: ''
    };
    expect(simActivationFormGroup.value).toEqual(simActivationFormValues);
  });

  it('Check SIM NUMBER Value Before Entering Some Value And Validation', () => {
    const simNumber: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm').querySelectorAll('input')[0];
    const simNumberValue = component.simActivationForm.get('simNumber');
    expect(simNumber.value).toEqual(simNumberValue.value);
    expect(simNumberValue.errors).not.toBeNull();
    expect(simNumberValue.errors.required).toBeTruthy();
  });

  it('Check EMAIL ADDRESS Value Before Entering Some Value And Validation', () => {
    const emailAddress: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm').querySelectorAll('input')[1];
    const emailAddressValue = component.simActivationForm.get('emailAddress');
    expect(emailAddress.value).toEqual(emailAddressValue.value);
    expect(emailAddressValue.errors).not.toBeNull();
    expect(emailAddressValue.errors.required).toBeTruthy();
  });

  // it('Check SIM ACTIVATION FORM Is VALID When Validations Are Fulfilled', () => {
  //   const simNumberElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm').querySelectorAll('input')[0].get;
  //   const emailAddressElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm').querySelectorAll('input')[1];
  //   simNumberElement.value = '6666666666666';
  //   emailAddressElement.value = 'testUser@hotmail.com';
  //   simNumberElement.dispatchEvent(new Event('input'));
  //   emailAddressElement.dispatchEvent(new Event('input'));
  //   const isSimActivationFormValid = component.simActivationForm.valid;
  //   fixture.whenStable().then(() => {
  //     expect(isSimActivationFormValid).toBeTruthy();
  //   })
  // });

  it('should call onSubmit() method on form submit', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const getForm = fixture.debugElement.query(By.css('#simActivationForm'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
  });

  it('should call validateActivationDetails() when onSubmit() is called', () => {
    const fyn = spyOn(component, 'validateActivationDetails');
    component.onSubmit();
    expect(fyn).toHaveBeenCalled();
  });

  it('should call activateSim() when button click', fakeAsync(() => {
    const infoService = TestBed.inject(SimInfoService);
    const service = TestBed.inject(SimActivationService);
    spyOn(infoService, 'getSimInfo').and.returnValue(of(expectedValue));
    component.activateSimBlock = expectedData;
    // fixture.detectChanges();

    // let test = spyOn(service, "simActivation").and.callFake(() => {
    //   return Rx.of(expectedData).pipe(delay(2000));
    // });

    component.activateSim();
    let button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    service.simActivation(outputData).subscribe(data => {
      expect(data).toEqual([outputData]);
      expect(component.successMsg).toEqual(true);
    });

    service.simActivationMock().subscribe(data => {
      expect(data).toEqual([outputData]);
    });
  }));

  it('SimInfoService should make a GET request', () => {
    const service = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.getSimInfo('6666666666666', 'testUser@hotmail.com').subscribe(data => {
      expect(data.body).toEqual(expectedData.ChannelOrderID);
    });

    let req = httpTestingController.expectOne(environment.getSimInfoEndpoint + '?SimNumber=6666666666666&emailID=testUser@hotmail.com');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData.ChannelOrderID);
  });

  it('#getSimInfo should return expected data', function(done) {
    const service = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
 
    service.getSimInfo('6666666666666', 'testUser@hotmail.com').subscribe(data => {
      expect(data.body).toBe(expectedData.ChannelOrderID);
    });
 
    const testRequest = httpTestingController.expectOne(environment.getSimInfoEndpoint + '?SimNumber=6666666666666&emailID=testUser@hotmail.com');
    testRequest.flush(expectedValue.ChannelOrderID);
    done();
  });

  it('#getSimInfoMock should return expected data', (done) => {
    const service = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
 
    service.getSimInfoMock(6666666666666).subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
 
    const testRequest = httpTestingController.expectOne(environment.simInfoURL + '6666666666666.json');
    testRequest.flush(expectedData);
  });

  it('simActivation should make a GET request', () => {
    const service = TestBed.inject(SimActivationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.simActivation(outputData).subscribe(data => {
      expect(data).toEqual([outputData]);
    });

    let req = httpTestingController.expectOne(environment.ActivateSimEndpoint);
    expect(req.request.method).toEqual('POST');
    req.flush([outputData]);
  });

  it('simActivationMock should make a GET request', () => {
    const service = TestBed.inject(SimActivationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.simActivationMock().subscribe(data => {
      expect(data).toEqual([outputData]);
    });

    let req = httpTestingController.expectOne(environment.simActivationDetailsURL);
    expect(req.request.method).toEqual('GET');
    req.flush([outputData]);
  });


  it('should use SimInfoService', () => {
    const service = TestBed.inject(SimInfoService);

    service.getSimInfo('6666666666666', 'testUser@hotmail.com').subscribe(data => {
      expect(data).toEqual(expectedValue);
    });
  });

  // it('should able to validateActivationDetails', ()=> {
  //   const infoService = TestBed.inject(SimInfoService);
  //   const httpTestingController = TestBed.inject(HttpTestingController);
  //   const simCardNumber = '6666666666666';
  //   const emailID = 'testUser@hotmail.com';

  //   spyOn(component, 'validateActivationDetails').and.callThrough;
  //   component.validateActivationDetails();
  //   expect(component.validateActivationDetails).toHaveBeenCalled();
  //   fixture.detectChanges();

  //   infoService.getSimInfo(simCardNumber, emailID).subscribe((data) => {
  //     expect(data.body).toEqual(expectedData);
  //   });
 
  //   const testRequest = httpTestingController.expectOne(environment.getSimInfoEndpoint + '?SimNumber=' + simCardNumber + '&emailID=' + emailID);
  //   testRequest.flush(expectedData);
  // });

  it('should able to validateActivationDetails', fakeAsync(()=> {
    const infoService = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    let simResponse = "{\"ChannelOrderID\":\"305939305939305939\",\"EmailID\":\"testUser@hotmail.com\",\"SimInfo\":[{\"SigmaProductID\":\"Koala\",\"LogicalresourceID\":\"0498555555\",\"SimCardNumber\":\"6666666666666\"},{\"SigmaProductID\":\"Eagle\",\"LogicalresourceID\":\"0498233449\",\"SimCardNumber\":\"7777777777777\"}]}";
    let response = JSON.parse(simResponse);
    spyOn(infoService, 'getSimInfo').and.returnValue(of(new HttpResponse({ status: 200, headers: new HttpHeaders({"JWT": "2324435tdgd" }),body: response })) ); 
    component.domain="";
    component.ngOnInit();
    let cookieService = TestBed.inject(CookieService);
    const componentElement: HTMLElement = fixture.nativeElement;
    const emailInput: HTMLInputElement = componentElement.querySelector('.emailAddress');
    emailInput.value = 'testUser@hotmail.com';
    emailInput.dispatchEvent(new Event('input'));
    const simInput: HTMLInputElement = componentElement.querySelector('.simNumber');
    simInput.value = '6666666666666';    simInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.validateActivationDetails();
    expect(cookieService.get('jwt-token')).toBe('2324435tdgd');
  }));

  it('should able to validateActivationDetails', fakeAsync(()=> {
    const infoService = TestBed.inject(SimInfoService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const simCardNumber = '6666666666666';
    const emailID = 'testUser@hotmail.com';
    
    component.simActivationForm.controls['simNumber'].setValue('6666666666666');
    component.simActivationForm.controls['emailAddress'].setValue('testUser@hotmail.com');

    infoService.getSimInfo(simCardNumber, emailID).subscribe((data) => {
      expect(data.body).toEqual(expectedData);
    });
  
    const testRequest = httpTestingController.expectOne(environment.getSimInfoEndpoint + '?SimNumber=' + simCardNumber + '&emailID=' + emailID);
    testRequest.flush(expectedData);

    // let test = spyOn(infoService, "getSimInfo").and.callFake(() => {
    //   return Rx.of(expectedData).pipe(delay(2000));
    // });

    component.validateActivationDetails();
  }));

  it('validateActivationDetails should call getSimInfo() in case of error', fakeAsync(() => {
    const infoService = TestBed.inject(SimInfoService);
    const errorResponse = new HttpErrorResponse({
      error: { code: `400`, message: `Errpor` },
      status: 400,
      statusText: 'Bad Request',
    });
    spyOn(infoService, 'getSimInfo').and.returnValue(throwError(errorResponse));
    component.validateActivationDetails();
    expect(component.errorMsg).toBeTrue();
  }));

  it('validateActivationDetails should call getSimInfo() in case of error', fakeAsync(() => {
    const infoService = TestBed.inject(SimInfoService);
    const errorResponse = new HttpErrorResponse({
      error: { code: `500`, message: `Errpor` },
      status: 500,
      statusText: 'Internal Server Error',
    });
    spyOn(infoService, 'getSimInfo').and.returnValue(throwError(errorResponse));
    component.validateActivationDetails();
    expect(component.errorMsg).toBeTrue();
  }));

  it('activateSim should call simActivation() in case of error', fakeAsync(() => {
    const service = TestBed.inject(SimActivationService);
    const infoService = TestBed.inject(SimInfoService);
    spyOn(infoService, 'getSimInfo').and.returnValue(of(expectedValue));
    component.activateSimBlock = expectedData;
    const errorResponse = new HttpErrorResponse({
      error: { code: `400`, message: `Errpor` },
      status: 400,
      statusText: 'Bad Request',
    });
    spyOn(service, 'simActivation').and.returnValue(throwError(errorResponse));
    component.activateSim();
    expect(component.errorMsg).toBeTrue();
  }));
  

  // it('unsubscribes when destoryed', () => {
  //   const spy = spyOn(component, 'ngOnDestroy').and.callThrough;
  //   component.ngOnDestroy();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should use SimActivationService', () => {
  //   const service = TestBed.inject(SimActivationService);
  //   service.simActivation(outputData).subscribe(data => {
  //     expect(data).toEqual([outputData]);
  //   });
  // });
});
function done() {
  throw new Error('Function not implemented.');
}

