import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionDetails } from 'src/app/core/models';
import { DEFAULT_MAX_FRACTION_DIGITS, DEFAULT_MIN_FRACTION_DIGITS, LOCALE_TOKEN, SHORT_DATE_FORMAT } from 'src/app/shared';

@Component( {
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransactionListComponent implements OnChanges {
    @Input() transactions: TransactionDetails[];

    readonly minFractionDigits = DEFAULT_MIN_FRACTION_DIGITS;
    readonly maxFractionDigit = DEFAULT_MAX_FRACTION_DIGITS;
    readonly shortDateFormat = SHORT_DATE_FORMAT;

    filteredTransactions: TransactionDetails[] = [];
    filterValue = '';

    constructor( @Inject( LOCALE_TOKEN ) public locale$: Observable<string>,
                 private cdRef: ChangeDetectorRef ) {
    }

    ngOnChanges( changes: SimpleChanges): void {
        if ( changes.transactions.currentValue ) {
            this.filterTransaction();
        }
    }

    handleFilterTransaction( name: string ): void {
        this.filterValue = name.trim().toLowerCase();
        this.filterTransaction();
    }

    private filterTransaction(): void {
        this.filteredTransactions = [ ...this.transactions ]?.filter( transaction => transaction.merchant.name.toLowerCase().includes( this.filterValue ) );
        this.cdRef.detectChanges();
    }
}
