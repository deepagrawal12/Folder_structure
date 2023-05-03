import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: ':languageCode/simactivation', loadChildren: () => import('./simactivation/simactivation.module').then(m => m.SimactivationModule),
  canActivate: [ AuthGuardService ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy'
}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
