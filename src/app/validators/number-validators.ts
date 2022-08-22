import {AbstractControl} from '@angular/forms';

export class NumberValidators {
    static positiveNumber(control: AbstractControl): { [key: string]: any } | null {
        return !isNaN(control.value) && Number(control.value) > 0
            ? null : {wrongNumber: true};
    }
}

