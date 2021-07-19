import { Pipe, PipeTransform } from '@angular/core';

import { FormatCurrencySymbol, NumberHelper } from '../helpers';
import { DEFAULT_CURRENCY } from '../constants';

@Pipe( {
    name: 'financialFormat',
    pure: false
} )
export class FinancialFormatPipe implements PipeTransform {
    private static readonly DEFAULT_MIN_FRACTION_DIGITS = 2;
    private static readonly DEFAULT_MAX_FRACTION_DIGITS = 2;

    private formatter = new FormatCurrencySymbol();

    transform( value: any, minFractionDigits = FinancialFormatPipe.DEFAULT_MIN_FRACTION_DIGITS, maxFractionDigit = FinancialFormatPipe.DEFAULT_MAX_FRACTION_DIGITS, currency = DEFAULT_CURRENCY ): string | null {
        if ( value !== null && value !== undefined ) {
            return this.formatter.format( typeof value === 'string' ? NumberHelper.toNumber( value ) : value, minFractionDigits, maxFractionDigit, currency );
        }
        return '';
    }
}