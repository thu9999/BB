import { of } from 'rxjs';
import { Dates, TransactionDetails, TransferTO } from 'src/app/core/models';
import { DataHelper } from 'src/app/shared';
import { TransactionService } from './transaction.service';

const CREATED_TRANSFER_ID = 12345;

describe( 'TransactionService', () => {
    let transactionService: TransactionService;
    let httpClientSpy: {
        get: jasmine.Spy
    };

    let fakeTransactions: TransactionDetails[];
    let fakeTransactionData: { data: TransactionDetails[] };
    let fakeTransaction: TransactionDetails;

    beforeEach( () => {
        httpClientSpy = jasmine.createSpyObj( 'HttpClient', [ 'get' ] );
        transactionService = new TransactionService( httpClientSpy as any );

        fakeTransactions = [
            {
                categoryCode: '#abc',
                dates: 1000000
            },
            {
                categoryCode: '#def',
                dates: 1000001
            },
        ].map( item => {
            const transaction = new TransactionDetails();
            
            transaction.dates = new Dates();
            transaction.dates.valueDate = item.dates;
        
            transaction.categoryCode = item.categoryCode;
            return transaction;
        } );
        
        fakeTransactionData = {
            data: fakeTransactions
        }
        
        fakeTransaction = new TransactionDetails();
        fakeTransaction.dates = new Dates();
        fakeTransaction.dates.valueDate = '2020-01-01' as any;
    } );

    describe( 'createTransfer', () => {
        it( 'should create transfer', ( done ) => {
            transactionService.createTransfer( new TransferTO() ).subscribe(
                transferId => {
                    expect( transferId ).toBe( CREATED_TRANSFER_ID );
                    done();
                },
                done.fail
            );
        } );
    } );

    describe( 'getTransactionList', () => {
        it( 'should return sorted transaction list by date', ( done ) => {
            httpClientSpy.get.and.returnValue( DataHelper.asyncData( fakeTransactionData ) );

            transactionService.getTransactionList().subscribe(
                transactions => {
                    expect( transactions[ 0 ].categoryCode ).toBe( '#def' );
                    expect( transactions[ 0 ].dates.valueDate ).toBe( 1000001 );

                    expect( transactions[ 1 ].categoryCode ).toBe( '#abc' );
                    expect( transactions[ 1 ].dates.valueDate ).toBe( 1000000 );

                    done();
                },
                done.fail
            );

            expect( httpClientSpy.get.calls.count() ).toBe( 1 );
        } );
    } );

    describe( 'getTransaction', () => {
        it( 'should return a transaction', ( done ) => {
            spyOn( DataHelper as any, 'asyncData' ).and.returnValue( of( fakeTransaction ) );

            transactionService.getTransaction( 123 ).subscribe(
                transaction => {
                    expect( transaction ).toEqual( fakeTransaction );
                    done();
                },
                done.fail
            );
        } );
    } );

    describe( 'dateStringToNumber', () => {
        it( 'should transform string to number date', () => {
            const result = ( transactionService as any ).dateStringToNumber( [ fakeTransaction ] );

            expect( typeof result[ 0 ].dates.valueDate ).toBe( 'number' );
        } );
    } );
} );