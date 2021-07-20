import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DebugElement, ElementRef, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { Observable, Subject } from 'rxjs';
import { SettingsService } from 'src/app/core/services';

import { BaseControlValueAccessorDirective, CdkOverlayService, FormatPipeModule, ORIGIN_END, ORIGIN_TOP, OVERLAY_DATA_TOKEN, OVERLAY_START, OVERLAY_TOP } from 'src/app/shared';
import { TransactionService, TRANSFER_FORM_KEYS } from '../shared';
import { TransferReviewComponent } from '../transfer-review/transfer-review.component';
import { TransferFormComponent } from './transfer-form.component';

const MY_ACCOUNT_BALANCE = 5000;
const ALLOWED_AMOUNT_BELOW_TOTAL_BALANCE = -500;
const TRANSFER_REVIEW_OFFSET_X_IN_PIXELS = 32;

@Component( {
    selector: 'app-header'
} )
class HeaderDummyComponent {}

@Component( {
    selector: 'app-text-prefix-input',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => TextPrefixInputDummyComponent ),
            multi: true
        }
    ]
} )
class TextPrefixInputDummyComponent extends BaseControlValueAccessorDirective {}

@Component( {
    selector: 'app-submit-button'
} )
class SubmitButtonDummyComponent {}

describe( 'TransferFormComponent', () => {
    let component: TransferFormComponent;
    let reviewComponent: TransferReviewComponent;
    let fixture: ComponentFixture<TransferFormComponent>;
    let debugElement: DebugElement;
    let overlay: Overlay;
    let cdkOverlayService: CdkOverlayService<TransferReviewComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                TransferFormComponent,
                HeaderDummyComponent,
                TextPrefixInputDummyComponent,
                SubmitButtonDummyComponent,
                TransferReviewComponent
            ],
            imports: [
                CommonModule,
                HttpClientModule,
                TranslateModule.forRoot(),
                ReactiveFormsModule,
                OverlayModule,
                TextMaskModule,
                FormatPipeModule
            ],
            providers: [
                CdkOverlayService,
                TransactionService,
                SettingsService,
                {
                    provide: OVERLAY_DATA_TOKEN,
                    useValue: {}
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        } ).overrideComponent( TransferFormComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( TransferFormComponent );
        debugElement = fixture.debugElement;
        component = fixture.componentInstance;
        overlay = TestBed.inject( Overlay );
        cdkOverlayService = TestBed.inject( CdkOverlayService );

        const reviewComponentFixture = TestBed.createComponent( TransferReviewComponent );
        reviewComponent = reviewComponentFixture.componentInstance;
    } );

    describe( 'method', () => {

        describe( 'ngOnInit', () => {
            it( 'should call other method', () => {
                const initFormGroupSpy = spyOn<any>( component, 'initFormGroup' );
                component.ngOnInit();
                expect( initFormGroupSpy ).toHaveBeenCalled();
            } );
        } );

        describe( 'getAmountError', () => {
            it( 'should return an empty string when invalid is false', () => {
                expect( component.getAmountError( false, {} ) ).toBe( '' );
            } );

            it( 'should return an empty string when errors is empty', () => {
                expect( component.getAmountError( true, {} ) ).toBe( '' );
            } );

            it( 'should return required error when required is defined', () => {
                const errors = {
                    required: 'Required',
                    lessThan: 'lessThan'
                }
                expect( component.getAmountError( true, errors ) ).toBe( 'transaction.transferForm.amount.validator.required' );
            } );

            it( 'should return lessThan error when required is undefined and lessThan is defined', () => {
                const errors = {
                    lessThan: 'lessThan'
                }
                expect( component.getAmountError( true, errors ) ).toBe( 'transaction.transferForm.amount.validator.lessThan' );
            } );
        } );

        describe( 'handleSubmitTransferForm', () => {
            let transferFormInvalidSpy: jasmine.Spy;
            let markAllAsTouchedSpy: jasmine.Spy;
    
            beforeEach( () => {
                fixture.detectChanges();
                transferFormInvalidSpy = spyOnProperty( component.transferForm, 'invalid', 'get' );
                markAllAsTouchedSpy = spyOn( component.transferForm, 'markAllAsTouched' );
            } );
    
            it( 'should mark form as touched when transferForm is invalid', () => {
                transferFormInvalidSpy.and.returnValue( true );
                component.handleSubmitTransferForm();
                expect( markAllAsTouchedSpy ).toHaveBeenCalled();
            } );
    
            it( 'should review transfer when transferForm is not invalid', () => {
                const listenForCloseOverlayEventsSpy = spyOn<any>( component, 'listenForCloseOverlayEvents' );
    
                transferFormInvalidSpy.and.returnValue( false );
                const elementRef = new ElementRef<any>( document.createElement( 'div' ) );
    
                const positionStrategy = overlay.position()
                                                .flexibleConnectedTo( elementRef )
                                                .withPositions( [
                                                    {
                                                        originX: ORIGIN_END,
                                                        originY: ORIGIN_TOP,
                                                        overlayX: OVERLAY_START,
                                                        overlayY: OVERLAY_TOP,
                                                        offsetX: TRANSFER_REVIEW_OFFSET_X_IN_PIXELS
                                                    }
                                                ] );
    
                    const config = new OverlayConfig( {
                        positionStrategy,
                        hasBackdrop: true,
                        panelClass: 'transfer-review-panel'
                    } );
                    const overlayRef = overlay.create( config );
                    const componentRef = overlayRef.attach( new ComponentPortal( TransferReviewComponent ) );
    
                    const createCdkOverlaySpy = spyOn( cdkOverlayService, 'createCdkOverlay' );
                    createCdkOverlaySpy.and.returnValue( {
                        overlayRef,
                        componentRef 
                    } );
    
                component.handleSubmitTransferForm();
                expect( markAllAsTouchedSpy ).not.toHaveBeenCalled();
    
                expect( createCdkOverlaySpy ).toHaveBeenCalledTimes( 1 );
                    expect( listenForCloseOverlayEventsSpy ).toHaveBeenCalledWith( overlayRef, componentRef.instance );
            } );
        } );

        describe( 'initFormGroup', () => {
            it( 'should init transfer form', () => {
                expect( component.transferForm ).toBeUndefined();
                ( component as any ).initFormGroup();
                expect( component.transferForm ).toBeDefined();

                expect( component.transferForm.get( TRANSFER_FORM_KEYS.FROM_ACCOUNT ) ).toBeTruthy();
                expect( component.transferForm.contains( TRANSFER_FORM_KEYS.TO_ACCOUNT ) ).toBeTrue();
                expect( component.transferForm.contains( TRANSFER_FORM_KEYS.AMOUNT ) ).toBeTrue();
            } );
        } );

        describe( 'getAmountValidators', () => {
            it( 'should return an array of validators', () => {
                expect( ( component as any ).getAmountValidators().length ).toBe( 3 )
            } );
        } );

        describe( 'listenForCloseOverlayEvents', () => {
            let overlayRef: any;
            let backdrop$: Subject<any>;
            let disposeSpy: jasmine.Spy;

            let resetTransferFormSpy: jasmine.Spy;
            let transferCreatedEmitSpy: jasmine.Spy;

            beforeEach( () => {
                backdrop$ = new Subject();
                overlayRef = {
                    backdropClick: (): Observable<any> => backdrop$,
                    dispose: () => {}
                };
                disposeSpy = spyOn( overlayRef, 'dispose' );

                resetTransferFormSpy = spyOn<any>( component, 'resetTransferForm' );
                transferCreatedEmitSpy = spyOn( component.transferCreated, 'emit' );
            } );

            it( 'should dispose overlay when user clicks on backdrop', fakeAsync( () => {
                ( component as any ).listenForCloseOverlayEvents( overlayRef, reviewComponent );
                backdrop$.next( 'clicked' );
                tick();
                expect( disposeSpy ).toHaveBeenCalled();

                expect( resetTransferFormSpy ).not.toHaveBeenCalled();
                expect( transferCreatedEmitSpy ).not.toHaveBeenCalled();
            } ) );

            it( 'should dispose overlay when getCloseOverlaySubjectAsObservable emits a value', fakeAsync( () => {
                const closeOverlay$ = new Subject<any>();
                spyOn( reviewComponent, 'getCloseOverlaySubjectAsObservable' ).and.returnValue( closeOverlay$ );
                ( component as any ).listenForCloseOverlayEvents( overlayRef, reviewComponent );
                
                closeOverlay$.next( 123 );
                tick();

                expect( disposeSpy ).toHaveBeenCalled();
                expect( resetTransferFormSpy ).toHaveBeenCalled();
                expect( transferCreatedEmitSpy ).toHaveBeenCalled();
            } ) );
        } );
    } );

    describe( 'template', () => {
        let container: DebugElement;

        beforeEach( () => {
            fixture.detectChanges();
            container = debugElement.query( By.css( '.container' ) );
        } );

        it( 'should have classes', () => {
            const containerClassList = container.nativeElement.classList;
            expect( containerClassList.contains( 'border-mr' ) ).toBeTrue();
            expect( containerClassList.contains( 'overflow-hidden' ) ).toBeTrue();
            expect( containerClassList.contains( 'bg-white' ) ).toBeTrue();
        } );

        it( 'should contain one header', () => {
            const headers = debugElement.queryAll( By.css( 'app-header' ) );
            expect( headers.length ).toBe( 1 );
        } );

        it( 'should render three text prefix inputs', () => {
            const inputs = debugElement.queryAll( By.css( 'app-text-prefix-input' ) );
            expect( inputs.length ).toBe( 3 );
        } );

        it( 'should render one submit button', () => {
            const submitButtons = debugElement.queryAll( By.css( 'app-submit-button' ) );
            expect( submitButtons.length ).toBe( 1 );
        } );
    } );
} );
