import { DEFAULT_MAX_FRACTION_DIGITS, DEFAULT_MIN_FRACTION_DIGITS } from '../constants';
import { LocaleEnum } from '../enums';

export class FormatCurrencySymbol {
    format( value: number, minFractionDigits = DEFAULT_MIN_FRACTION_DIGITS, maxFractionDigits = DEFAULT_MAX_FRACTION_DIGITS, currency = 'EUR', local = LocaleEnum.NL ): string {
        const style = 'currency';

        if ( !Number.isNaN( value ) ) {
            return value.toLocaleString( local, {
                style,
                minimumFractionDigits: minFractionDigits,
                maximumFractionDigits: maxFractionDigits,
                currency
            } );
        }

        return ' - ';
    }
}