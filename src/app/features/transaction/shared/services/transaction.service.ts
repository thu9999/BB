import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DataHelper, DateHelper, NumberHelper } from 'src/app/shared';
import { TransactionDetails, TransferTO } from '../../../../core/models';
import * as transactions from 'src/app/mock/mock-data/transactions.json';
import * as transaction from 'src/app/mock/mock-data/transaction.json';

const CREATED_TRANSFER_ID = 12345;

@Injectable()
export class TransactionService {
    private url = environment.baseUrl;

    constructor( private http: HttpClient ) {
    }

    createTransfer( transferTO: TransferTO ): Observable<number> {
        return DataHelper.asyncData( CREATED_TRANSFER_ID );
    }

    getTransactionList(): Observable<TransactionDetails[]> {
        const path = 'dev/transactions';
        return this.http.get<TransactionDetails[]>( `${ this.url }/${ path }` ).pipe(
            pluck( 'data'),
            catchError( () => of( transactions.data as TransactionDetails[] ) ),
            map( ( transactionDetails: TransactionDetails[] ) => this.dateStringToNumber( transactionDetails ) ),
            map( ( transactionDetails: TransactionDetails[] ) => transactionDetails.sort( ( a, b ) => NumberHelper.compareDesc( a.dates.valueDate, b.dates.valueDate ) ) ),
        )
    }

    getTransaction( transferId: number ): Observable<TransactionDetails> {
        return DataHelper.asyncData( transaction.data as TransactionDetails );
    }

    private dateStringToNumber( transactionDetails: TransactionDetails[] ): TransactionDetails[] {
        return transactionDetails.map( transaction => ( {
            ...transaction,
            dates: {
                valueDate: DateHelper.toNumberDate( transaction.dates.valueDate )
            }
        } ) );
    }
}