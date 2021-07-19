import { AbstractControl, ValidatorFn } from '@angular/forms';

import { NumberHelper } from '../helpers';

export class CustomValidators {
    static lessThan( value: number, offset: number ): ValidatorFn {
        return ( control: AbstractControl ): { [ key: string ]: any } => {
            const controlValue = ( typeof control.value ) === 'string' ? NumberHelper.toNumber( control.value ) : control.value;
            return controlValue < value + offset ? null : ( { lessThan: value } );
        }
    }
}