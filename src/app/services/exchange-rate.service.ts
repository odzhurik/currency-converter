import {ExchangeRateApi} from "./exchange-rate-api.service";
import {Injectable} from "@angular/core";
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {DateHelperService} from "./date-helper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ConversionInput} from "../models/conversion-input.model";
import {ConversionResult} from "../models/conversion-result.model";
import {Observation} from "../models/api-response.model";

@Injectable()
export class ExchangeRateService {
    constructor(private readonly _exchangeRateApi: ExchangeRateApi,
                private readonly _dateHelper: DateHelperService) {
    }

    public convert(conversionInput: ConversionInput): Observable<ConversionResult> {
        let formattedDate = this._dateHelper.getFormattedDate(conversionInput.conversionDate);

        return this._exchangeRateApi.getRate(conversionInput.fromCurrency, conversionInput.toCurrency, formattedDate)
            .pipe(map(data => this.mapToConversionResult(conversionInput, data.observations)),
                catchError((errorResponse: HttpErrorResponse) => {

                    return errorResponse.status == 404 ? of(null) :
                        throwError(errorResponse);
                }));
    }

    private mapToConversionResult(conversionInput: ConversionInput, observations: Observation []): ConversionResult {
        if (!observations.length) {
            return null;
        }

        let rate = observations[0][`FX${conversionInput.fromCurrency}${conversionInput.toCurrency}`].v;
        let conversionDate = this._dateHelper.parseIso(observations[0].d);

        return new ConversionResult(conversionInput.fromAmount * rate, rate, conversionDate);
    }
}
