import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimactivationComponent } from './simactivation.component';
import { SimactivationRoutingModule } from './simactivation-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PhoneNumberFormatPipe } from '../pipe/phone-number-format.pipe';
import { SimNumberFormatPipe } from '../pipe/sim-number-format.pipe';
import { SimNumberDirective } from '../directive/sim-number.directive';

@NgModule({
  declarations: [SimactivationComponent,
    PhoneNumberFormatPipe,
    SimNumberFormatPipe,
    SimNumberDirective],
  imports: [
    CommonModule,
    SimactivationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SimactivationComponent,
    
  ],
})
export class SimactivationModule { }
