import { FinancialFormatPipe } from './financial-format.pipe';

describe( 'FinancialFormatPipe', () => {
    let pipe: FinancialFormatPipe;

    beforeEach( () => {
        pipe = new FinancialFormatPipe();
    } );

    describe( 'transform', () => {
        it( 'should return an empty string when value is null or undefined', () => {
            expect( pipe.transform( null ) ).toBe( '' );
            expect( pipe.transform( undefined ) ).toBe( '' );
        } );

        it( 'should transform number to financial format string', () => {
            expect( pipe.transform( 1000000 ) ).toBe( '€1,000,000.00' );
            expect( pipe.transform( 1000000, 2, 2, 'USD' ) ).toBe( '$1,000,000.00' );
            expect( pipe.transform( 1000000, 4, 4, 'VND' ) ).toBe( '₫1,000,000.0000' );
        } );
    } );
} );
