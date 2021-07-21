import { NumberHelper } from "./number.helper";

describe( 'NumberHelper', () => {
    
    describe( 'toNumber', () => {
        it( 'should transform string to number', () => {
            expect( NumberHelper.toNumber( '123456' ) ).toBe( 123456 );
            expect( NumberHelper.toNumber( '1000,000.99' ) ).toBe( 1000000.99 );
            expect( NumberHelper.toNumber( '1000.99' ) ).toBe( 1000.99 );
        } );
    } );

    describe( 'compareDesc', () => {
        it( 'should return -1 when a is greater than b', () => {
            expect( NumberHelper.compareDesc( 1, 0 ) ).toBe( -1 );
            expect( NumberHelper.compareDesc( 99, 98.99 ) ).toBe( -1 );
            expect( NumberHelper.compareDesc( -1, -2 ) ).toBe( -1 );
        } );

        it( 'should return 1 when a is less than b', () => {
            expect( NumberHelper.compareDesc( 1, 1.1 ) ).toBe( 1 );
            expect( NumberHelper.compareDesc( 99, 100 ) ).toBe( 1 );
            expect( NumberHelper.compareDesc( -1, -0.5 ) ).toBe( 1 );
        } );

        it( 'should return 0 when a is equal to b', () => {
            expect( NumberHelper.compareDesc( 1, 1 ) ).toBe( 0 );
            expect( NumberHelper.compareDesc( 99, 99 ) ).toBe( 0 );
            expect( NumberHelper.compareDesc( -1, -1 ) ).toBe( 0 );
            expect( NumberHelper.compareDesc( 0, 0 ) ).toBe( 0 );
        } );
    } );
} );