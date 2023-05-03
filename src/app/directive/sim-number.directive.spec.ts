import { SimNumberDirective } from './sim-number.directive';
import { SimactivationComponent } from '../simactivation/simactivation.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, Injector } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule,TranslateService } from '@ngx-translate/core';

describe('SimNumberDirective', () => {
  let component: SimactivationComponent;
  let fixture: ComponentFixture<SimactivationComponent>;
  let inputEl: DebugElement;
  let directive: SimNumberDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule, HttpClientModule, TranslateModule.forRoot()
      ],
      declarations: [SimactivationComponent, SimNumberDirective],
      providers: [ CookieService, TranslateService ]
    });
    fixture = TestBed.createComponent(SimactivationComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new SimNumberDirective(null);
    expect(directive).toBeTruthy();
  });

  it('onModelChange() should call', () => {
    const directive = fixture.debugElement.query(By.directive(SimNumberDirective)).injector.get(SimNumberDirective) as SimNumberDirective;
    const spy = spyOn(directive, 'onModelChange');
    inputEl.triggerEventHandler('ngModelChange', null);
    fixture.detectChanges();
    expect(directive.onModelChange).toHaveBeenCalled();
  });

  it('keydownBackspace() should call', () => {
    const directive = fixture.debugElement.query(By.directive(SimNumberDirective)).injector.get(SimNumberDirective) as SimNumberDirective;
    const spy = spyOn(directive, 'keydownBackspace');
    inputEl.triggerEventHandler('keydown.backspace', null);
    fixture.detectChanges();
    expect(directive.keydownBackspace).toHaveBeenCalled();
  });

  it('should log event and call onModelChange() when model changes are detected', () => {
    const directive = fixture.debugElement.query(By.directive(SimNumberDirective)).injector.get(SimNumberDirective) as SimNumberDirective;
    const spy1 = spyOn(directive, 'onInputChange').and.callThrough();
    const eventMock1 = '';
    const eventMock2 = '6666';
    const eventMock3 = '66666666';
    const eventMock4 = '666666666666';
    const eventMock5 = '6666666666666';
    const eventMock6 = '666666';
    directive.onModelChange(eventMock1);
    directive.onModelChange(eventMock2);
    directive.onModelChange(eventMock3);
    directive.onModelChange(eventMock4);
    directive.onModelChange(eventMock5);
    directive.onInputChange(eventMock6, true);
    expect(spy1).toHaveBeenCalled();
  });

  it('should log event and call keydownBackspace() when keyEvent', () => {
    const directive = fixture.debugElement.query(By.directive(SimNumberDirective)).injector.get(SimNumberDirective) as SimNumberDirective;
    const spy1 = spyOn(directive, 'onInputChange').and.callThrough();
    const eventMock = {
      'target': {
        value: '6666666666666'
      }
    };
    directive.keydownBackspace(eventMock);
    expect(spy1).toHaveBeenCalled();
  });

  // it('should push Brilliant when the Description is so', () => {
  //   const directive = fixture.debugElement.query(By.directive(SimNumberDirective)).injector.get(SimNumberDirective) as SimNumberDirective;
  //   spyOn(directive, 'onInputChange').and.callThrough();

  //   const simNumberElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm').querySelectorAll('input')[0];
  //   const emailAddressElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#simActivationForm').querySelectorAll('input')[1];
  //   simNumberElement.value = '';
  //   emailAddressElement.value = 'testUser@hotmail.com';
    
  //   expect(simNumberElement.value.length).toBe(0);
  //   expect(simNumberElement.value).toBe('');
  // })
});
