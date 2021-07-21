import { LocalStorageHelper } from "./local-storage.helper";

describe( 'LocalStorageHelper', () => {
    afterEach( () => {
        localStorage.clear();
    } );

    describe( 'getItem', () => {
        it( 'should get item by key', () => {
            localStorage.setItem( 'key', 'value' );
            expect( LocalStorageHelper.getItem( 'key' ) ).toBe( 'value' );
            expect( LocalStorageHelper.getItem( 'non-existing-key' ) ).toBeNull();
        } );
    } );

    describe( 'setItem', () => {
        it( 'should set item in local storage', () => {
            expect( localStorage.getItem( 'key' ) ).toBeNull();
            LocalStorageHelper.setItem( 'key', 'value' );
            expect( localStorage.getItem( 'key' ) ).toBe( 'value' );
        } );
    } );
} );