import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {ApiResponse} from "../models/api-response.model";

@Injectable()
export class ExchangeRateApi {
  constructor(private _httpClient: HttpClient) {
  }

  public getRate(fromCurrency: string, toCurrency: string, rateDate: string): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('start_date', rateDate)
      .set('end_date', rateDate);
    return this._httpClient.get<ApiResponse>(`https://www.bankofcanada.ca/valet/observations/FX${fromCurrency}${toCurrency}/json`, {params});
  }
}
