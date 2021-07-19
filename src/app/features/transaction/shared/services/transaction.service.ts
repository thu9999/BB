import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { TransferTO } from '../../../../core/models';

const DELAY_IN_MILLISECONDS = 1000;
const CREATED_TRANSFER_ID = 12345;

@Injectable()
export class TransactionService {
    constructor( private http: HttpClient ) {
    }

    createTransfer( transferTO: TransferTO ): Observable<number> {
        return TransactionService.asyncData( CREATED_TRANSFER_ID );
    }

    /**
     * Simulate http
     * Emit once and complete
     */
    static asyncData<T>( data: T ) {
        return defer( () => Promise.resolve( data ) ).pipe(
            delay( DELAY_IN_MILLISECONDS )
        );
    }
}