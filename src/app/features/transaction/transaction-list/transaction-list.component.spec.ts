import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { TransactionDetails } from 'src/app/core/models';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionItemComponent } from 'src/app/bb-ui/components/transaction-item/transaction-item.component';
import { FinancialFormatPipe } from 'src/app/shared/pipes/financial-format.pipe';
import { DEFAULT_LOCALE, FormatPipeModule, LOCALE_TOKEN } from 'src/app/shared';

@Component( {
    selector: 'app-header'
} )
class HeaderDummyComponent {}

@Component( {
    selector: 'app-filter'
} )
class FilterDummyComponent {}

const fakeFilteredTransactions: TransactionDetails[] = [
    {
        categoryCode: '#12a580',
        dates: {
            valueDate: 1600493600000
        },
        transaction: {
            amountCurrency: {
                amount: 5000,
                currencyCode: 'EUR'
            },
            type: 'Salaries',
            creditDebitIndicator: 'CRDT'
        },
        merchant: {
            name: 'Backbase',
            accountNumber: 'SI64397745065188826'
        }
    },
    {
        categoryCode: '#12a580',
        dates: {
            valueDate: 1600387200000
        },
        transaction: {
        amountCurrency: {
            amount: -82.02,
            currencyCode: 'EUR'
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT'
        },
        merchant: {
            name: 'The Tea Lounge',
            accountNumber: 'SI64397745065188826'
        }
    }
] as any[];

const datePipe = new DatePipe( DEFAULT_LOCALE );
const financialFormat = new FinancialFormatPipe();

describe( 'TransactionListComponent', () => {
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;
    let debugElement: DebugElement;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                TransactionListComponent,
                HeaderDummyComponent,
                FilterDummyComponent,
                TransactionItemComponent
            ],
            imports: [
                CommonModule,
                FormatPipeModule,
                TranslateModule.forRoot()
            ],
            providers: [
                {
                    provide: LOCALE_TOKEN,
                    useValue: null
                }
            ]
        } ).overrideComponent( TransactionListComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( TransactionListComponent );
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    } );

    describe( 'method', () => {

        describe( 'ngOnChanges', () => {
            let filterTransactionSpy: jasmine.Spy;

            beforeEach( () => {
                filterTransactionSpy = spyOn<any>( component, 'filterTransaction' );
            } );

            it( 'should not call filterTransaction when currentValue is undefined', () => {
                component.ngOnChanges( {} );
                expect( filterTransactionSpy ).not.toHaveBeenCalled();
            } );

            it( 'should not call filterTransaction when currentValue is undefined', () => {
                component.ngOnChanges( {
                    transactions: {
                        currentValue: undefined
                    } as any
                } );
                expect( filterTransactionSpy ).not.toHaveBeenCalled();
            } );

            it( 'should call filterTransaction when currentValue is defined', () => {
                component.ngOnChanges( {
                    transactions: {
                        currentValue: []
                    } as any
                } );
                expect( filterTransactionSpy ).toHaveBeenCalled();
            } );
        } );

        describe( 'handleFilterTransaction', () => {
            it( 'should filter transaction and update filter value', () => {
                const filterTransactionSpy = spyOn<any>( component, 'filterTransaction' );

                expect( component.filterValue ).toBe( '' );
                component.handleFilterTransaction( 'BACK_BASE' );

                expect( component.filterValue ).toBe( 'back_base' );
                expect( filterTransactionSpy ).toHaveBeenCalled();
            } );
        } );

        describe( 'filterTransaction', () => {
            it( 'should filter transaction', () => {
                const transactions = [
                    {
                        merchant: {
                            name: 'Back_base'
                        }
                    },
                    {
                        merchant: {
                            name: 'Xebia'
                        }
                    },
                    {
                        merchant: {
                            name: 'BANK'
                        }
                    }
                ] as any[];
                component.transactions = transactions;
                component.filterValue = 'BA';
                expect( component.filteredTransactions ).toEqual( [] );
                
                ( component as any ).filterTransaction();

                expect( component.filteredTransactions ).toEqual( [
                    {
                        merchant: {
                            name: 'Back_base'
                        }
                    },
                    {
                        merchant: {
                            name: 'BANK'
                        }
                    }
                ] as any[] );

                component.filterValue = 'x';
                ( component as any ).filterTransaction();

                expect( component.filteredTransactions ).toEqual( [
                    {
                        merchant: {
                            name: 'Xebia'
                        }
                    }
                ] as any[] );
            } );
        } );
    } );

    describe( 'template', () => {
        beforeEach( () => {
            component.filteredTransactions = fakeFilteredTransactions;
            fixture.detectChanges();
        } );

        describe( 'container', () => {
            let container: DebugElement;

            beforeEach( () => {
                container = debugElement.query( By.css( '.container' ) );
            } );

            it( 'should have classes', () => {
                const classList = container.nativeElement.classList;

                expect( classList.contains( 'border-mr' ) ).toBeTrue();
                expect( classList.contains( 'overflow-hidden' ) ).toBeTrue();
                expect( classList.contains( 'bg-white' ) ).toBeTrue();
            } );

            it( 'should contain one app header', () => {
                const headers = debugElement.queryAll( By.css( 'app-header' ) );
                expect( headers.length ).toBe( 1 );
            } );

            describe( 'transaction list container', () => {
                let transactionListContainer: DebugElement;
                
                beforeEach( () => {
                    transactionListContainer = container.query( By.css( '.transaction-list-container' ) );
                } );

                it( 'should have padding large class', () => {
                    const classList = transactionListContainer.nativeElement.classList;
                    expect( classList.contains( 'p-l' ) ).toBeTrue();
                } );

                it( 'should contain one filter element', () => {
                    const filters = transactionListContainer.queryAll( By.css( 'app-filter' ) );
                    expect( filters.length ).toBe( 1 );
                } );

                describe( 'transaction list', () => {
                    let transactionList: DebugElement;

                    beforeEach( () => {
                        transactionList = transactionListContainer.query( By.css( '.transaction-list' ) );
                    } );

                    it( 'should have padding top large class', () => {
                        const classList = transactionList.nativeElement.classList;
                        expect( classList.contains( 'pt-l' ) ).toBeTrue();
                    } );

                    describe( 'transaction items', () => {
                        let transactionItems: DebugElement[];

                        beforeEach( () => {
                            transactionItems = transactionList.queryAll( By.css( 'app-transaction-item' ) );
                        } );

                        it( 'should contains a number of transaction item equal to filtered transaction length', () => {
                            expect( transactionItems.length ).toBe( fakeFilteredTransactions.length );
                            transactionItems.forEach( transactionItem => {
                                const classList = transactionItem.nativeElement.classList;
                                expect( classList.contains( 'p-l' ) ).toBeTrue();
                                expect( classList.contains( 'mt-s' ) ).toBeTrue();
                                expect( classList.contains( 'mb-s' ) ).toBeTrue();
                            } );
                        } );

                        it( 'should render content', () => {
                            transactionItems.forEach( ( transactionItem, index ) => {
                                const transactionColour = transactionItem.query( By.css( 'div[data-test-hook="transactionColour"]' ) ).nativeElement as HTMLElement;
                                expect( transactionColour.textContent ).toBe( '' );

                                const transactionDate = transactionItem.query( By.css( 'div[data-test-hook="transactionDate"]' ) ).nativeElement as HTMLElement;
                                expect( transactionDate.textContent ).toBe( datePipe.transform( fakeFilteredTransactions[ index ].dates.valueDate, component.shortDateFormat ) );

                                const transactionDateClassList = transactionDate.classList;
                                expect( transactionDateClassList.contains( 'p-s' ) ).toBeTrue();

                                const transactionMerchantName = transactionItem.query( By.css( 'div[data-test-hook="transactionMerchantName"]' ) ).nativeElement as HTMLElement;
                                expect( transactionMerchantName.textContent ).toBe( fakeFilteredTransactions[ index ].merchant.name );

                                const transactionMerchantNameClassList = transactionMerchantName.classList;
                                expect( transactionMerchantNameClassList.contains( 'p-s' ) ).toBeTrue();

                                const transactionType = transactionItem.query( By.css( 'div[data-test-hook="transactionType"]' ) ).nativeElement as HTMLElement;
                                expect( transactionType.textContent ).toBe( fakeFilteredTransactions[ index ].transaction.type );

                                const transactionTypeClassList = transactionType.classList;
                                expect( transactionTypeClassList.contains( 'p-s' ) ).toBeTrue();

                                const transactionAmount = transactionItem.query( By.css( 'div[data-test-hook="transactionAmount"]' ) ).nativeElement as HTMLElement;
                                const expectedAmount = financialFormat.transform( fakeFilteredTransactions[ index ].transaction.amountCurrency.amount, component.minFractionDigits, component.maxFractionDigit, fakeFilteredTransactions[ index ]?.transaction?.amountCurrency?.currencyCode );
                                expect( transactionAmount.textContent.trim() ).toBe( expectedAmount );

                                const transactionAmountClassList = transactionAmount.classList;
                                expect( transactionAmountClassList.contains( 'p-s' ) ).toBeTrue();
                                if ( fakeFilteredTransactions[ index ].transaction.amountCurrency.amount > 0 ) {
                                    expect( transactionAmountClassList.contains( 'positive' ) ).toBeTrue();
                                } else {
                                    expect( transactionAmountClassList.contains( 'negative' ) ).toBeTrue();
                                }
                            } );
                        } );
                    } );
                } );
            } );
        } );
    } );
} );
