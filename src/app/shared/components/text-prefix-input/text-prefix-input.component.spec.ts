import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { DEFAULT_CURRENCY_SYMBOL, DEFAULT_DECIMAL_NUMBER } from '../../constants';
import { NumberHelper } from '../../helpers';

import { TextPrefixInputComponent } from './text-prefix-input.component';

describe( 'TextPrefixInputComponent', () => {
    let component: TextPrefixInputComponent;
    let fixture: ComponentFixture<TextPrefixInputComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                TextPrefixInputComponent
            ],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                TextMaskModule,
                TranslateModule.forRoot()
            ]
        } ).overrideComponent( TextPrefixInputComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent(TextPrefixInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    describe( 'container', () => {
        let container: DebugElement;

        beforeEach( () => {
            container = fixture.debugElement.query( By.css( '.input-container' ) );
        } );

        it( 'should have other classes', () => {
            const containerClassList = container.nativeElement.classList;
            expect( containerClassList.contains( 'pt-s' ) ).toBeTrue();
            expect( containerClassList.contains( 'pb-s' ) ).toBeTrue();
        } );

        describe( 'label', () => {
            it( 'should not be rendered when label is undefined', () => {
                component.label = undefined;
                fixture.detectChanges();
                const label = container.query( By.css( '.label' ) );
                expect( label ).toBeNull();
            } );

            it( 'should be rendered when label is defined', () => {
                component.label = 'LABEL';
                fixture.detectChanges();

                const label = container.query( By.css( '.label' ) );
                expect( label ).toBeTruthy();
                expect( label.nativeElement.textContent ).toBe( 'LABEL' );

                const labelClassList = label.nativeElement.classList;
                expect( labelClassList.contains( 'pt-m' ) ).toBeTrue();
                expect( labelClassList.contains( 'pb-m' ) ).toBeTrue();
            } );
        } );

        describe( 'content', () => {
            let content: DebugElement;

            beforeEach( () => {
                content = container.query( By.css( '.content' ) );
            } );

            it( 'should have classes', () => {
                const contentClassList = content.nativeElement.classList;
                expect( contentClassList.contains( 'border-sr' ) ).toBeTrue();
                expect( contentClassList.contains( 'overflow-hidden' ) ).toBeTrue();
            } );

            it( 'should or should not have form invalid class', () => {
                component.error = '';
                fixture.detectChanges();
                expect( content.nativeElement.classList.contains( 'form-invalid' ) ).toBeFalse();

                component.error = 'required';
                fixture.detectChanges();
                expect( content.nativeElement.classList.contains( 'form-invalid' ) ).toBeTrue();
            } );

            it( 'should or should not have bg-secondary class', () => {
                const controlDisabledSpy = spyOnProperty( component.control, 'disabled', 'get' );
                
                controlDisabledSpy.and.returnValue( false );
                fixture.detectChanges();
                expect( content.nativeElement.classList.contains( 'bg-secondary' ) ).toBeFalse();

                controlDisabledSpy.and.returnValue( true );
                fixture.detectChanges();
                expect( content.nativeElement.classList.contains( 'bg-secondary' ) ).toBeTrue();
            } );

            describe( 'prefix', () => {
                it( 'should not be rendered when prefix is an empty string', () => {
                    component.prefix = '';
                    fixture.detectChanges();

                    const prefix = content.query( By.css( '.prefix' ) );
                    expect( prefix ).toBeNull();
                } );

                it( 'should be rendered when prefix is defined', () => {
                    component.prefix = 'PREFIX';
                    fixture.detectChanges();

                    const prefix = content.query( By.css( '.prefix' ) );
                    expect( prefix ).toBeTruthy();

                    const classList = prefix.nativeElement.classList;
                    expect( classList.contains( 'pl-m' ) ).toBeTrue();

                    expect( prefix.nativeElement.textContent ).toBe( component.prefix );
                } );
            } );

            describe( 'prefix icon', () => {
                it( 'should not be rendered when prefix icon is an empty string', () => {
                    component.prefixIcon = '';
                    fixture.detectChanges();

                    const prefixIcon = content.query( By.css( '.prefix-icon' ) );
                    expect( prefixIcon ).toBeNull();
                } );

                it( 'should be rendered when prefix icon is defined', () => {
                    component.prefixIcon = 'PREFIX_ICON';
                    fixture.detectChanges();

                    const prefixIcon = content.query( By.css( '.prefix-icon' ) );
                    expect( prefixIcon ).toBeTruthy();

                    const classList = prefixIcon.nativeElement.classList;
                    expect( classList.contains( 'bg-secondary' ) ).toBeTrue();
                    expect( classList.contains( 'p-m' ) ).toBeTrue();

                    expect( prefixIcon.nativeElement.textContent ).toBe( component.prefixIcon );
                } );
            } );

            describe( 'input', () => {
                let input: DebugElement;
                
                beforeEach( () => {
                    input = content.query( By.css( '.input' ) );
                } );

                it( 'should have overflow-hidden class', () => {
                    const inputClassList = input.nativeElement.classList;
                    expect( inputClassList.contains( 'overflow-hidden' ) ).toBeTrue();
                } );

                it( 'should trigger onTouched when being clicked', () => {
                    const onTouchedSpy = spyOn( component, 'onTouched' );
                    input.triggerEventHandler( 'click', {} );
                    expect( onTouchedSpy ).toHaveBeenCalled();
                } );

                it( 'should have text mask input when textMask is defined', () => {
                    component.mask = NumberHelper.getDecimalMask( DEFAULT_DECIMAL_NUMBER, false, DEFAULT_CURRENCY_SYMBOL );
                    component.placeholder = 'PLACEHOLDER';
                    fixture.detectChanges();

                    const inputElement = input.query( By.css( 'input' ) ).nativeElement;
                    expect( inputElement.value ).toBe( '' );
                    expect( component.control.value ).toBeNull();

                    const typedValueOne = '123abc.452';
                    const expectedValueOne = '€123.45';

                    inputElement.value = typedValueOne;
                    inputElement.dispatchEvent( new Event( 'input' ) );
                    
                    expect( inputElement.value ).toBe( expectedValueOne);
                    expect( component.control.value ).toBe( expectedValueOne );

                    const typedValueTwo = '123456abc.452';
                    const expectedValueTwo = '€123,456.45';

                    inputElement.value = typedValueTwo;
                    inputElement.dispatchEvent( new Event( 'input' ) );
                    
                    expect( inputElement.value ).toBe( expectedValueTwo);
                    expect( component.control.value ).toBe( expectedValueTwo );
                } );

                it( 'should have input without mask when mask is undefined', () => {
                    component.mask = undefined;
                    fixture.detectChanges();

                    const inputElement = input.query( By.css( 'input' ) ).nativeElement;
                    
                    expect( inputElement.value ).toBe( '' );
                    expect( component.control.value ).toBeNull();

                    const typedValue = '123abc,.456$#%';
                    inputElement.value = typedValue;
                    inputElement.dispatchEvent( new Event( 'input' ) );

                    expect( component.control.value ).toBe( typedValue );
                } );
            } );

            describe( 'error', () => {
                it( 'should not be rendered when error is undefined', () => {
                    component.error = undefined;
                    fixture.detectChanges();

                    const error = container.query( By.css( '.text-error' ) );
                    expect( error ).toBeNull();
                } );

                it( 'should be rendered when error is defined', () => {
                    component.error = 'ERROR';
                    fixture.detectChanges();

                    const error = container.query( By.css( '.text-error' ) );
                    expect( error ).toBeTruthy();

                    const errorClassList = error.nativeElement.classList;
                    expect( errorClassList.contains( 'p-s') ).toBeTrue();

                    expect( error.nativeElement.textContent ).toBe( component.error );
                } );
            } );
        } );
    } );
} );
