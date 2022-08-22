import {ViewOption} from "../models/view-option.model";

export class CurrencyOptionsProviderService {
    public getCurrencyOptions(): ViewOption[] {
        return [
            new ViewOption("US Dollar", "USD"),
            new ViewOption("Canadian Dollar", "CAD"),
            new ViewOption("Euro", "EUR"),
            new ViewOption("Japanese Yen", "JPY"),
            new ViewOption("British Pound", "GBP"),
            new ViewOption("Australian Dollar", "AUD"),
            new ViewOption("Swiss Franc", "CHF"),
            new ViewOption("Chinese Yuan Renminbi", "CNY"),
            new ViewOption("Hong Kong Dollar", "HKD"),
            new ViewOption("Mexican Peso", "MXN"),
            new ViewOption("Indian Rupee", "INR")
        ]
    }
}
