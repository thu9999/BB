import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
import { DEFAULT_DECIMAL_NUMBER, DECIMAL_SYMBOL, THOUSAND_SEPARATOR_SYMBOL } from '../constants';

export class NumberHelper {

    static getDecimalMask( decimalLimit = DEFAULT_DECIMAL_NUMBER, allowNegative = false, prefix = '' ): any {
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

    static compareDesc( a: number, b: number ): number {
        if ( a > b ){
            return -1;
        }

        if ( a < b ){
            return 1;
        }
        return 0;
    }
}