import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DateHelper, NumberHelper } from 'src/app/shared';
import { TransactionDetails, TransferTO } from '../../../../core/models';

@Injectable()
export class TransactionService {
    private url = environment.baseUrl;

    constructor( private http: HttpClient ) {
    }

    createTransfer( transferTO: TransferTO ): Observable<number> {
        const path = 'dev/transactions';
        return this.http.post<TransactionDetails[]>( `${ this.url }/${ path }`, transferTO ).pipe(
            pluck( 'data', 'id' )
        );
    }

    getTransactionList(): Observable<TransactionDetails[]> {
        const path = 'dev/transactions';
        return this.http.get<TransactionDetails[]>( `${ this.url }/${ path }` ).pipe(
            pluck( 'data' ),
            map( ( transactionDetails: TransactionDetails[] ) => this.dateStringToNumber( transactionDetails ) ),
            map( ( transactionDetails: TransactionDetails[] ) => transactionDetails.sort( ( a, b ) => NumberHelper.compareDesc( a.dates.valueDate, b.dates.valueDate ) ) ),
        )
    }

    getTransaction( transferId: number ): Observable<TransactionDetails> {
        const path = `dev/transactions/${ transferId }`;
        return this.http.get<TransactionDetails[]>( `${ this.url }/${ path }` ).pipe(
            pluck( 'data')
        );
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