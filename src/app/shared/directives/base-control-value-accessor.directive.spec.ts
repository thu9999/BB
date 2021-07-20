import { fakeAsync, tick } from '@angular/core/testing';

import { BaseControlValueAccessorDirective } from './base-control-value-accessor.directive';

describe( 'BaseControlValueAccessorDirective', () => {
    let directive: BaseControlValueAccessorDirective;

    beforeEach( () => {
        directive = new BaseControlValueAccessorDirective();
    } );
    
    describe( 'writeValue', () => {
        it( 'should write value', () => {
            const setValueSpy = spyOn( directive.control, 'setValue' );
            const value = 'TEST_VALUE';
            directive.writeValue( value );
            expect( setValueSpy ).toHaveBeenCalledWith( value );
        } );
    } );

    describe( 'registerOnChange', () => {
        it( 'should register on change', fakeAsync( () => {
            const fakeMethod = jasmine.createSpy( 'fakeMethod' );
            directive.registerOnChange( fakeMethod );
            tick();

            const testValue = 'TEST_VALUE';
            directive.control.patchValue( testValue );
            tick();

            expect( fakeMethod ).toHaveBeenCalledWith( testValue );
        } ) );
    } );

    describe( 'setDisabledState', () => {
        it( 'should disable date control when isDisabled is true', () => {
            const disableSpy = spyOn( directive.control, 'disable' );
            directive.setDisabledState( true );
            expect( disableSpy ).toHaveBeenCalled();
        } );

        it( 'should enable date control when isDisabled is false', () => {
            const enableSpy = spyOn( directive.control, 'enable' );
            directive.setDisabledState( false );
            expect( enableSpy ).toHaveBeenCalled();
        } );
    } );
} );