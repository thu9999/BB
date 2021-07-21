import { Pipe, PipeTransform } from '@angular/core';

import { FormatCurrencySymbol, NumberHelper } from '../helpers';
import { DEFAULT_CURRENCY, DEFAULT_MAX_FRACTION_DIGITS, DEFAULT_MIN_FRACTION_DIGITS } from '../constants';

@Pipe( {
    name: 'financialFormat',
    pure: false
} )
export class FinancialFormatPipe implements PipeTransform {

    private formatter = new FormatCurrencySymbol();

    transform( value: any, minFractionDigits = DEFAULT_MIN_FRACTION_DIGITS, maxFractionDigit = DEFAULT_MAX_FRACTION_DIGITS, currency = DEFAULT_CURRENCY ): string | null {
        if ( value !== null && value !== undefined ) {
            return this.formatter.format( typeof value === 'string' ? NumberHelper.toNumber( value ) : value, minFractionDigits, maxFractionDigit, currency );
        }
        return '';
    }
}