import {Component, Input} from '@angular/core';
import {ConversionInput} from "../models/conversion-input.model";
import {ConversionResult} from "../models/conversion-result.model";
import {SYSTEM_DATE_FORMAT} from "../models/date-consts";

@Component({
    selector: 'exchange-rate-details',
    templateUrl: './exchange-rate-details.component.html'
})
export class ExchangeRateDetailsComponent {
    @Input()
    public convertResult: ConversionResult;
    @Input()
    public conversionInput: ConversionInput;
    public systemDateFormat = SYSTEM_DATE_FORMAT;

    constructor() {
    }
}
