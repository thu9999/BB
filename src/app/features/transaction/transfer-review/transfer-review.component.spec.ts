import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { TransferReviewComponent } from './transfer-review.component';
import { TransferTO } from 'src/app/core/models';
import { SettingsService } from 'src/app/core/services';
import { APP_LOADING, DataHelper, DELAY_IN_MILLISECONDS, FormatPipeModule, OVERLAY_DATA_TOKEN } from 'src/app/shared';
import { TransactionService, TransferFormValue } from '../shared';
import { By } from '@angular/platform-browser';

const CREATED_TRANSFER_ID = 123;

const data = new TransferFormValue();
data.amount = '100,000.99';
data.fromAccount = 'FROM_ACCOUNT';
data.toAccount = 'TO_ACCOUNT';

class TransactionServiceStub {
    createTransfer( transferTO: TransferTO ): Observable<number> {
        return DataHelper.asyncData( CREATED_TRANSFER_ID );
    }
}

@Component( {
    selector: 'app-display-item'
} )
class DisplayItemDummyComponent {}

describe( 'TransferReviewComponent', () => {
    let component: TransferReviewComponent;
    let fixture: ComponentFixture<TransferReviewComponent>;
    let settingsService: SettingsService;
    let debugElement: DebugElement;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                TransferReviewComponent,
                DisplayItemDummyComponent
            ],
            imports: [
                CommonModule,
                TranslateModule.forRoot(),
                FormatPipeModule
            ],
            providers: [
                {
                    provide: TransactionService,
                    useClass: TransactionServiceStub
                },
                {
                    provide: OVERLAY_DATA_TOKEN,
                    useValue: data
                },
                SettingsService
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        } ).overrideComponent( TransferReviewComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( TransferReviewComponent );
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        settingsService = TestBed.inject( SettingsService );
    } );

    describe( 'method', () => {
        
        describe( 'closeTransferReview', () => {
            it( 'should emit a new value', () => {
                const closeOverlaySubjectNextSpy = spyOn( ( component as any ).closeOverlaySubject, 'next' );
                component.closeTransferReview();
                expect( closeOverlaySubjectNextSpy ).toHaveBeenCalled();
            } );
        } );

        describe( 'submitTransfer', () => {
            it( 'should create transfer and overlay subject emit new value', fakeAsync( () => {
                const updateSettingSpy = spyOn( settingsService, 'updateSetting' );
                const closeOverlaySubjectNextSpy = spyOn( ( component as any ).closeOverlaySubject, 'next' );

                component.submitTransfer();
                expect( updateSettingSpy ).toHaveBeenCalledWith( APP_LOADING, true );
                expect( closeOverlaySubjectNextSpy ).not.toHaveBeenCalled();

                tick( DELAY_IN_MILLISECONDS );
                expect( updateSettingSpy ).toHaveBeenCalledWith( APP_LOADING, false );
                expect( closeOverlaySubjectNextSpy ).toHaveBeenCalled();
            } ) );
        } );
    } );

    describe( 'template', () => {
        let container: DebugElement;

        beforeEach( () => {
            fixture.detectChanges();
            container = debugElement.query( By.css( '.transfer-review-container' ) );
        } );

        it( 'should have other classes', () => {
            const classList = container.nativeElement.classList;
            expect( classList .contains( 'border-mr' ) ).toBeTrue();
            expect( classList .contains( 'overflow-hidden' ) ).toBeTrue();
        } );

        describe( 'header', () => {
            let header: DebugElement;

            beforeEach( () => {
                header = container.query( By.css( '.transfer-review-header' ) );
            } );

            it( 'should have padding large class', () => {
                const headerClassList = header.nativeElement.classList;
                expect( headerClassList.contains( 'p-l' ) ).toBe( true );
            } );

            it( 'should render header text', () => {
                const headerText = header.query( By.css( '.transfer-review-header-text' ) ).nativeElement;
                expect( headerText.textContent ).toBe( 'transaction.transferReview.header' );
            } );

            it( 'should render close button', () => {
                const closeDiv = header.query( By.css( '.close' ) );
                const closeButton = closeDiv.query( By.css( 'button' ) );
                expect( closeButton.nativeElement.textContent ).toBe( 'x' );

                const closeTransferReviewSpy = spyOn( component, 'closeTransferReview' );
                closeButton.triggerEventHandler( 'click', {} );
                expect( closeTransferReviewSpy ).toHaveBeenCalled();
            } );
        } );

        describe( 'content', () => {
            let content: DebugElement;

            beforeEach( () => {
                content = container.query( By.css( '.transfer-review-content' ) );
            } );

            it( 'should have other classes', () => {
                const contentClassList = content.nativeElement.classList;
                expect( contentClassList.contains( 'p-l' ) ).toBeTrue();
            } );

            it( 'should render confirmation question', () => {
                const confirmation = content.query( By.css( '.confirmation' ) ).nativeElement;
                expect( confirmation.textContent ).toBe( 'transaction.transferReview.confirmation' );
            } );

            it( 'should render two display items', () => {
                const displayItems = content.queryAll( By.css( 'app-display-item' ) );
                expect( displayItems.length ).toBe( 2 );
            } );
        } );

        describe( 'actions', () => {
            let actions: DebugElement;

            beforeEach( () => {
                actions = container.query( By.css( '.actions' ) );
            } );

            it( 'should have other classes', () => {
                const actionsClassList = actions.nativeElement.classList;
                expect( actionsClassList.contains( 'p-l' ) ).toBeTrue();
            } );

            it( 'should render close button', () => {
                const closeButton = actions.query( By.css( 'button.close' ) );
                expect( closeButton.nativeElement.textContent ).toBe( 'transaction.transferReview.actions.close' );

                const closeTransferReviewSpy = spyOn( component, 'closeTransferReview' );
                closeButton.triggerEventHandler( 'click', {} );
                expect( closeTransferReviewSpy ).toHaveBeenCalled();
            } );

            it( 'should render submit button', () => {
                const submitButton = actions.query( By.css( 'button.submit' ) );
                const submitButtonClassList = submitButton.nativeElement.classList;
                expect( submitButtonClassList.contains( 'btn-primary' ) ).toBeTrue();
                expect( submitButton.nativeElement.textContent ).toBe( 'transaction.transferReview.actions.sendTransfer' );

                const submitTransferSpy = spyOn( component, 'submitTransfer' );
                submitButton.triggerEventHandler( 'click', {} );
                expect( submitTransferSpy ).toHaveBeenCalled();
            } );
        } );
    } );
} );
