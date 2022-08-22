export class ConversionInput {
    constructor(public fromAmount: number,
                public fromCurrency: string,
                public toCurrency: string,
                public conversionDate: Date) {
    }
}
