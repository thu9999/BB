import { DateHelper } from "./date.helper";

describe( 'DateHelper', () => {
    describe( 'toNumberDate', () => {
        it( 'should return date in number', () => {
            expect( typeof DateHelper.toNumberDate( '2020-01-02' ) ).toBe( 'number' );
            expect( typeof DateHelper.toNumberDate( 12345678 ) ).toBe( 'number' );
        } );
    } );
} );