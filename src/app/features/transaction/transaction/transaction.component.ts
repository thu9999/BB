import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { TransactionDetails } from 'src/app/core/models';
import { TransactionService } from '../shared';

@Component( {
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: [
        './transaction.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransactionComponent implements OnInit {
    transactionsList: TransactionDetails[] = [];

    constructor( private transactionService: TransactionService,
                 private cdRef: ChangeDetectorRef ) {
    }

    ngOnInit(): void {
        this.getTransactionList();
    }
    
    handleTransferCreatedEvent( transferId: number ): void {
        this.transactionService.getTransaction( transferId ).subscribe( transaction => {
            this.transactionsList = [
                transaction,
                ...this.transactionsList
            ];
            this.cdRef.detectChanges();
        } );;
    }

    private getTransactionList(): void {
        this.transactionService.getTransactionList().subscribe( transactionList => {
            this.transactionsList = transactionList;
            this.cdRef.detectChanges();
        } );
    }
}
