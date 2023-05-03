import { TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// mocked source of events
const routerEventsSubject = new Subject<RouterEvent>();

const routerStub = {
    events: routerEventsSubject.asObservable()
};

describe('AppComponent', () => {
  let router: Router;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
            provide: Router,
            useValue: routerStub
        }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Activation Webpage'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Activation Webpage');
  });

  it('should be loading on a navigation start', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    routerEventsSubject.next(new NavigationStart(1, 'start'));
    expect(app.loading).toBeTruthy();
  });

  it('should be loading on a navigation end', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    routerEventsSubject.next(new NavigationEnd(1, 'end', ''));
    expect(app.loading).toBeFalsy();
  });
});
