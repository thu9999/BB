import { ChangeDetectionStrategy, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { TransactionComponent } from './transaction.component';
import { TransactionDetails } from 'src/app/core/models';
import { TransactionService } from '../shared';
import { DataHelper, DELAY_IN_MILLISECONDS } from 'src/app/shared';

const fakeTransaction = new TransactionDetails();

class TransactionServiceStub {
    getTransaction( transferId: number ): Observable<TransactionDetails> {
        return DataHelper.asyncData( fakeTransaction );
    }

    getTransactionList(): Observable<TransactionDetails[]> {
        return DataHelper.asyncData( [ fakeTransaction ] );
    }
}

@Component( {
    selector: 'app-transfer-form'
} )
class TransferFormDummyComponent {}

@Component( {
    selector: 'app-transaction-list'
} )
class TransactionListDummyComponent {}


describe('TransactionComponent', () => {
    let component: TransactionComponent;
    let fixture: ComponentFixture<TransactionComponent>;
    let debugElement: DebugElement;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                TransactionComponent,
                TransferFormDummyComponent,
                TransactionListDummyComponent
            ],
            providers: [
                {
                    provide: TransactionService,
                    useClass: TransactionServiceStub
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        } ).overrideComponent( TransactionComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( TransactionComponent );
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    } );

    describe( 'method', () => {

        describe( 'ngOnInit', () => {
            it( 'should call other methods', () => {
                const getTransactionListSpy = spyOn<any>( component, 'getTransactionList' );
                component.ngOnInit();
                expect( getTransactionListSpy ).toHaveBeenCalled();
            } );
        } );

        describe( 'handleTransferCreatedEvent', () => {
            it( 'should get transaction detail and update transaction list', fakeAsync( () => {
                component.transactionsList = [ fakeTransaction ];

                component.handleTransferCreatedEvent( 12345 );
                expect( component.transactionsList.length ).toBe( 1 );

                tick( DELAY_IN_MILLISECONDS - 1 );
                expect( component.transactionsList.length ).toBe( 1 );

                tick( DELAY_IN_MILLISECONDS );
                expect( component.transactionsList.length ).toEqual( 2 );
            } ) );
        } );

        describe( 'getTransactionList', () => {
            it( 'should update transaction list', fakeAsync( () => {
                expect( component.transactionsList ).toEqual( [] );
                ( component as any ).getTransactionList();
                expect( component.transactionsList ).toEqual( [] );

                tick( DELAY_IN_MILLISECONDS -1 );
                expect( component.transactionsList ).toEqual( [] );

                tick( DELAY_IN_MILLISECONDS );
                expect( component.transactionsList ).toEqual( [ fakeTransaction ] );
            } ) );
        } );
    } );

    describe( 'template', () => {
        beforeEach( () => {
            fixture.detectChanges();
        } );

        it( 'should render one app-transfer-form', () => {
            const transferFormElements = debugElement.queryAll( By.css( 'app-transfer-form' ) );
            expect( transferFormElements.length ).toBe( 1 );
        } );

        it( 'should render one app-transaction-list', () => {
            const TransactionListElements = debugElement.queryAll( By.css( 'app-transaction-list' ) );
            expect( TransactionListElements.length ).toBe( 1 );
        } );
    } );
} );
