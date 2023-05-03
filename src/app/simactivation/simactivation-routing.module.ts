import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimactivationComponent } from './simactivation.component';


const routes: Routes = [
  { path: '', component: SimactivationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimactivationRoutingModule { }
