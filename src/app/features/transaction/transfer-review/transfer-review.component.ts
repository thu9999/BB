import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SettingsService } from 'src/app/core/services';
import { TransactionHelper, TransactionService, TransferFormValue } from '../shared';
import { APP_LOADING, DEFAULT_MAX_FRACTION_DIGITS, DEFAULT_MIN_FRACTION_DIGITS, OVERLAY_DATA_TOKEN } from 'src/app/shared';

@Component( {
    selector: 'app-transfer-review',
    templateUrl: './transfer-review.component.html',
    styleUrls: [
        './transfer-review.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransferReviewComponent {
    readonly minFractionDigits = DEFAULT_MIN_FRACTION_DIGITS;
    readonly maxFractionDigits = DEFAULT_MAX_FRACTION_DIGITS;

    private closeOverlaySubject = new Subject<number>();

    constructor( @Inject( OVERLAY_DATA_TOKEN ) public data: TransferFormValue,
                 private transactionService: TransactionService,
                 private settingsService: SettingsService ) {
    }
    
    getCloseOverlaySubjectAsObservable(): Observable<number> {
        return this.closeOverlaySubject.asObservable();
    }

    closeTransferReview(): void {
        this.closeOverlaySubject.next();
    }

    submitTransfer(): void {
        const transferTO = TransactionHelper.createTransferTO( this.data );
        this.settingsService.updateSetting( APP_LOADING, true );

        this.transactionService.createTransfer( transferTO ).pipe(
            finalize( () => this.settingsService.updateSetting( APP_LOADING, false ) )
        ).subscribe( this.closeOverlaySubject );
    }
}
