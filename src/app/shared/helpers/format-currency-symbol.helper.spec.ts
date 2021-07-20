import { FormatCurrencySymbol } from "./format-currency-symbol.helper";

describe( 'FormatCurrencySymbol', () => {
    describe( 'format', () => {
        let formatCurrencySymbol: FormatCurrencySymbol;

        beforeEach( () => {
            formatCurrencySymbol = new FormatCurrencySymbol();
        } );

        it( 'should return - when value is not number', () => {
            expect( formatCurrencySymbol.format( 1234.784 ) ).toBe( '€1,234.78' );
            expect( formatCurrencySymbol.format( 1234.785 ) ).toBe( '€1,234.79' );
            expect( formatCurrencySymbol.format( 1234.786 ) ).toBe( '€1,234.79' );

            expect( formatCurrencySymbol.format( 1234.786, 3, 4 ) ).toBe( '€1,234.786' );
        } );
    } );
} );