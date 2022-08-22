import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExchangeRateComponent} from './exchange-rate/exchange-rate.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ExchangeRateApi} from "./services/exchange-rate-api.service";
import {ExchangeRateService} from "./services/exchange-rate.service";
import {DateHelperService} from "./services/date-helper.service";
import {CurrencyOptionsProviderService} from "./services/currency-options.provider.service";
import { ExchangeRateDetailsComponent } from './exchange-rate-details/exchange-rate-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRateComponent,
    ExchangeRateDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatNativeDateModule,
        MatDatepickerModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        ReactiveFormsModule
    ],
  providers: [ExchangeRateApi, ExchangeRateService, DateHelperService, CurrencyOptionsProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
