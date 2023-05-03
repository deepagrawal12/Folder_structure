import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, EmailValidator } from '@angular/forms';
import { SimCardInformation } from '../models/simCardInfo.model';
import { Subscription } from 'rxjs';
import { SimInfoService } from '../services/sim-info.service';
import { SimActivationService } from '../services/sim-activation.service';
import { SimInformation } from '../models/sim-activation.model';
import { SimNumberFormatPipe } from '../pipe/sim-number-format.pipe';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-simactivation',
  templateUrl: './simactivation.component.html',
  styleUrls: ['./simactivation.component.scss']
})
export class SimactivationComponent implements OnInit, OnDestroy {
  errorMsg: boolean;
  httpError: string;
  successMsg: boolean;
  simActivationForm: FormGroup;
  simNumber: number;
  emailAddress = '';
  activateSimBlock: SimCardInformation;
  showReview = false;
  activateSimBtn: any = [];
  infocheck = false;
  domain = ".orange.be";
  private subscription: Subscription;

  /**
   * Implements Constructor
   * @param fb
   * @param simInfo
   * @param simActivate
   */
  constructor(private fb: FormBuilder, private simInfo: SimInfoService,
    private simActivate: SimActivationService, private cookie: CookieService) { }

  /**
   * Implements ngOnInit lifecycle hook.
   */
  ngOnInit() {
    this.initializeForm();
  }

  /**
   * @function initializeForm: Initializing the form group
   */
  initializeForm() {
    this.simActivationForm = this.fb.group({
      simNumber: ['', (Validators.required, Validators.minLength(16), Validators.pattern('[0-9]*'), ValidateSimCard)],
      emailAddress: ['', (Validators.required, Validators.pattern(/^(([^\<\>\(\)\[\]\{\}\$\#\%\^\&\*\+\=\!\\.\,\;\:\s@\"]+(\.[^\<\>\(\)\[\]\{\}\$\#\%\^\&\*\+\=\!\\_\,\;\:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z0-9]{2,}))$/))]
    });
  }

  /**
   * @function onSubmit: get form data of user on form submission
   */
  onSubmit() {
    this.errorMsg = false;
    this.validateActivationDetails();
    window.scrollTo(0, document.getElementById('simForm').offsetTop);
    if (this.simActivationForm.invalid) {
      return;
    }
  }

  /**
   * @function validateActivationDetails: get review data from backened
   */
  validateActivationDetails() {
    const simnum = this.simActivationForm.get('simNumber').value;
    const mailId = this.simActivationForm.get('emailAddress').value;
    const reviewBlockServiceMode = true;
    if (reviewBlockServiceMode) {
      this.subscription = this.simInfo.getSimInfo(simnum, mailId)
        .subscribe((simInfoDetails) => {
          // const keysHeaders = simInfoDetails.headers.keys();
          const jwtToken = simInfoDetails.headers.get('JWT');
          // this.cookie.set('jwt-token', jwtToken);
          this.cookie.set('jwt-token',jwtToken, 0, '/', this.domain, true, 'Strict');
          this.activateSimBlock = simInfoDetails.body;
          if (this.activateSimBlock) {
            this.showReview = true;
            this.simActivationForm.disable();
            this.activateSimBtn.push('1');
          }
        },
          (error) => {
            this.errorMsg = true;
            if (error.status === 404 || error.status === 400 || error.status === 401 || error.status === 409) {
              // Sorry this SIM card couldn't be activated. Check your information above.
              this.httpError = '';
            }
            if (error.status === 500) {
              this.httpError = 'Service is not available at this moment, please try again after sometime';
            }
          });
    } else {
      this.subscription = this.simInfo.getSimInfoMock(simnum)
        .subscribe((simInfoDetails) => {
          this.activateSimBlock = simInfoDetails;
          if (simInfoDetails) {
            this.showReview = true;
            this.simActivationForm.disable();
            this.activateSimBtn.push('1');
          }
        },
          (error) => {
            this.errorMsg = true;
          });
    }
  }

  /**
  * @function activateSim: after review order , user will be able to activate the sim card
  */
  activateSim() {
    const simNumbers = [];
    this.activateSimBlock.SimInfo.forEach(SimDetails => {
      simNumbers.push(SimDetails.SimCardNumber);
    });

    const simActivationData: SimInformation = {
      ChannelOrderID: this.activateSimBlock.ChannelOrderID,
      SimInfo: simNumbers
    };
    const activateSimServiceMode = true;
    if (activateSimServiceMode) {
      this.simActivate.simActivation(simActivationData).subscribe(
        (response) => {
          this.successMsg = true;
          this.infocheck = true;
        },
        (error) => {
          this.errorMsg = true;
        });
    } else {
      this.simActivate.simActivationMock().subscribe(
        (response) => {
          this.successMsg = true;
          this.infocheck = true;
        },
        (error) => { }
      );
    }
    this.activateSimBtn = [];
    window.scrollBy(0, 100);
  }

  /**
   * Implements ngOnDestroy lifecycle hook.
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();  
    } 
  }
}

/**
  * @function ValidateSimCard: Custom validation for Validate Sim card number
  */
function ValidateSimCard(control: AbstractControl) {
  const simNum = control.value.split(' ').join('');
  if (luhn_checksum(simNum) !== 0) {
    return { validateSim: true };
  } else {
    return null;
  }
}

/**
  * @function luhn_checksum: Implementation of Luhn algorithm for SIM card validation
  * @param simVal
  */
function luhn_checksum(simVal) {
  const len = simVal.length;
  const parity = len % 2;
  let sum = 0;
  for (let i = len - 1; i >= 0; i--) {
    let d = parseInt(simVal.charAt(i));
    if (i % 2 === parity) { d *= 2; }
    if (d > 9) { d -= 9; }
    sum += d;
  }
  return sum % 10;
}
