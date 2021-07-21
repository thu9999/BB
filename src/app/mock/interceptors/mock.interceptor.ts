import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { HttpCode, HttpRequestMethod } from 'src/app/shared';

import * as transactions from './../mock-data/transactions/transactions.json';
import * as transactionDetails from './../mock-data/transactions/transaction.json';
import * as createTransaction from './../mock-data/transactions/create-transaction.json';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return of( null ).pipe(
            mergeMap( () => {
                if ( request.method === HttpRequestMethod.OPTIONS ) {
                    return of( new HttpResponse( { status: HttpCode.OK } ) );
                }

                switch ( request.method ) {
                    case HttpRequestMethod.POST : {
                        const transactionExpReg = /\/dev\/transactions/i;
                        if ( transactionExpReg.test( request.url ) ) {
                            console.warn( 'MOCK_RETURNING /dev/transactions: create-transaction.json' );
                            return of( new HttpResponse( {
                                status: HttpCode.OK,
                                body: ( createTransaction as any ).default
                            } ) );
                        }
                    }

                    case HttpRequestMethod.GET : {
                        const transactionExpReg = /\/dev\/transactions$/i;
                        if ( transactionExpReg.test( request.url ) ) {
                            console.warn( 'MOCK_RETURNING /dev/transactions: transactions.json' );
                            return of( new HttpResponse( {
                                status: HttpCode.OK,
                                body: ( transactions as any ).default
                            } ) );
                        }

                        const transactionDetailsExpReg = /\/dev\/transactions\/[^\/]+$/i;
                        if ( transactionDetailsExpReg.test( request.url ) ) {
                            console.warn( 'MOCK_RETURNING /dev/transactions/id: transactionDetails.json' );
                            return of( new HttpResponse( {
                                status: HttpCode.OK,
                                body: ( transactionDetails as any ).default
                            } ) );
                        }
                    }
                }

                return next.handle( request );
            } ),
            materialize(),
            delay( 500 ),
            dematerialize()
        )
    };
}