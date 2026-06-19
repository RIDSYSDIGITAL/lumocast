import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IqWorldTcComponent } from './pages/iq-world-tc/iq-world-tc.component';
import { TechnicalRequirementComponent } from './pages/technical-requirement/technical-requirement.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'warranty', component: WarrantyComponent },
  { path: 'iq-world-tc', component: IqWorldTcComponent },
  { path: 'technical-requirement', component: TechnicalRequirementComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 100]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
