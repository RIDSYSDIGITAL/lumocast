import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IqWorldTcComponent } from './pages/iq-world-tc/iq-world-tc.component';
import { TechnicalRequirementComponent } from './pages/technical-requirement/technical-requirement.component';
import { WarrantyComponent } from './pages/warranty/warranty.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WarrantyComponent,
    IqWorldTcComponent,
    TechnicalRequirementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
