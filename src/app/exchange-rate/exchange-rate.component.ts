import {Component, OnInit} from '@angular/core';
import {ViewOption} from "../models/view-option.model";
import {ExchangeRateService} from "../services/exchange-rate.service";
import {CurrencyOptionsProviderService} from "../services/currency-options.provider.service";
import {finalize} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {NumberValidators} from "../validators/number-validators";
import {ConversionResult} from "../models/conversion-result.model";
import {ConversionInput} from "../models/conversion-input.model";

@Component({
    selector: 'app-exchange-rate',
    templateUrl: './exchange-rate.component.html',
    styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
    public currencyOptions: ViewOption [] = [];
    public conversionResult: ConversionResult;
    public isConversionFinished: boolean;
    public today: Date = new Date();
    public formGroup: FormGroup;
    public conversionInput: ConversionInput;

    constructor(private readonly _exchangeRateService: ExchangeRateService,
                private readonly _currencyOptionsOptionsProvider: CurrencyOptionsProviderService) {
    }

    public ngOnInit(): void {
        this.currencyOptions = this._currencyOptionsOptionsProvider.getCurrencyOptions();
        this.formGroup = this.createFormGroup();
        this.formGroup.valueChanges.subscribe(_ => this.isConversionFinished = false);
    }

    public convert(): void {
        this.conversionInput = this.formGroup.value as ConversionInput;
        this._exchangeRateService.convert(this.conversionInput)
            .pipe(finalize(() => this.isConversionFinished = true))
            .subscribe(convertResult => this.conversionResult = convertResult);
    }

    public get conversionDateControl(): FormControl {
        return this.formGroup.get('conversionDate') as FormControl;
    }

    public get fromAmountControl(): FormControl {
        return this.formGroup.get('fromAmount') as FormControl;
    }

    public get toCurrencyControl(): FormControl {
        return this.formGroup.get('toCurrency') as FormControl;
    }

    public get fromCurrencyControl(): FormControl {
        return this.formGroup.get('fromCurrency') as FormControl;
    }

    private createFormGroup(): FormGroup {
        return new FormGroup({
            conversionDate: new FormControl(this.today),
            fromAmount: new FormControl(null, {validators: [NumberValidators.positiveNumber], updateOn: 'blur'}),
            toCurrency: new FormControl("USD"),
            fromCurrency: new FormControl("CAD")
        });
    }
}
