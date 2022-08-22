import {ExchangeRateApi} from "./exchange-rate-api.service";
import {Injectable} from "@angular/core";
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {DateHelperService} from "./date-helper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ConversionInput} from "../models/conversion-input.model";
import {ConversionResult} from "../models/conversion-result.model";

@Injectable()
export class ExchangeRateService {
  constructor(private readonly _exchangeRateApi: ExchangeRateApi,
              private readonly _dateHelper: DateHelperService) {
  }

  public convert(conversionInput: ConversionInput): Observable<ConversionResult> {
    let formattedDate = this._dateHelper.getFormattedDate(conversionInput.conversionDate);

    return this._exchangeRateApi.getRate(conversionInput.fromCurrency, conversionInput.toCurrency, formattedDate)
      .pipe(map(data => {
        if(!data.observations.length){
          return null;
        }
        let rate = data.observations[0][`FX${conversionInput.fromCurrency}${conversionInput.toCurrency}`].v;
        let conversionDate = this._dateHelper.parseIso(data.observations[0].d);
        return new ConversionResult(conversionInput.fromAmount * rate, rate, conversionDate);

      }), catchError((errorResponse: HttpErrorResponse) => {

        if (errorResponse.status == 404) {
          return of(null);
        }
        throwError(errorResponse)
      }));
  }
}
