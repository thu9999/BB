import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
import { DECIMAL_NUMBER_DEFAULT, DECIMAL_SYMBOL, THOUSAND_SEPARATOR_SYMBOL } from '../constants';

export class NumberHelper {

    static getDecimalMask( decimalLimit = DECIMAL_NUMBER_DEFAULT, allowNegative = false, prefix = '' ): any {
        return createNumberMask( {
            prefix: prefix,
            allowDecimal: true,
            allowNegative: allowNegative,
            thousandsSeparatorSymbol: THOUSAND_SEPARATOR_SYMBOL,
            decimalSymbol: DECIMAL_SYMBOL,
            decimalLimit: decimalLimit
        } );
    }

    static toNumber( str: string ): number | null {
        const thousandSymbolRegex = new RegExp( THOUSAND_SEPARATOR_SYMBOL, 'g' );
        if ( !str || str.length === 0 ) {
            return null;
        }
        return Number( str.replace( thousandSymbolRegex, '' ).replace( DECIMAL_SYMBOL, '.' ) );
    }
}