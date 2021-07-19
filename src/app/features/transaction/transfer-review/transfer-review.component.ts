import { Component, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { TransferFormValue } from '../shared';
import { OVERLAY_DATA_TOKEN } from 'src/app/shared';

@Component( {
    selector: 'app-transfer-review',
    templateUrl: './transfer-review.component.html',
    styleUrls: [
        './transfer-review.component.scss'
    ]
} )
export class TransferReviewComponent {
    private closeOverlaySubject = new Subject<boolean>();

    constructor( @Inject( OVERLAY_DATA_TOKEN ) public data: TransferFormValue ) {
    }
    
    getCloseOverlaySubjectAsObservable(): Observable<boolean> {
        return this.closeOverlaySubject.asObservable();
    }

}
