import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    CdkOverlayService,
    CURRENCY_DEFAULT,
    CustomValidators,
    DECIMAL_NUMBER_DEFAULT,
    DestroySubscriptionDirective,
    NumberHelper,
    ORIGIN_END,
    ORIGIN_TOP,
    OVERLAY_START,
    OVERLAY_TOP
} from 'src/app/shared';
import { TRANSFER_FORM_KEYS } from './../shared';
import { TransferReviewComponent } from '../transfer-review/transfer-review.component';

const MY_ACCOUNT_BALANCE = 5000;
const ALLOWED_AMOUNT_BELOW_TOTAL_BALANCE = -500;
const TRANSFER_REVIEW_OFFSET_X_IN_PIXELS = 32;

@Component( {
    selector: 'app-transfer-form',
    templateUrl: './transfer-form.component.html',
    styleUrls: [
        './transfer-form.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransferFormComponent extends DestroySubscriptionDirective implements OnInit {
    @ViewChild( 'transferFormElement', { static: false } ) transferFormElementRef: ElementRef;

    readonly transferFormKeys = TRANSFER_FORM_KEYS;
    readonly amountMask = NumberHelper.getDecimalMask();
    readonly fromAccountMask = NumberHelper.getDecimalMask( DECIMAL_NUMBER_DEFAULT, false, `${ CURRENCY_DEFAULT } `)

    transferForm: FormGroup;
    
    constructor( private cdkOverlayService: CdkOverlayService<TransferReviewComponent>,
                 private fb: FormBuilder,
                 private overlay: Overlay,
                 private translateService: TranslateService ) {
        super();
    }

    ngOnInit(): void {
        this.initFormGroup();
    }

    getAmountError = ( invalid: boolean, errors: { [ key: string ]: string } ): string => {
        if ( !invalid ) {
            return ''
        }

        if ( errors?.required ) {
            return this.translateService.instant( 'transaction.transferForm.amount.validator.required' );
        }

        if ( errors?.lessThan ) {
            return this.translateService.instant( 'transaction.transferForm.amount.validator.lessThan' );
        }
        return '';
    }

    handleSubmitTransferForm(): void {
        if ( this.transferForm.invalid ) {
            this.transferForm.markAllAsTouched();
            return;
        }

        console.log( this.transferFormElementRef )
        const positionStrategy = this.getTransferReviewOverlayStrategy( this.transferFormElementRef );

        const config = new OverlayConfig( {
            positionStrategy,
            hasBackdrop: true,
            panelClass: 'transfer-review-panel'
        } );

        const { overlayRef, componentRef } = this.cdkOverlayService.createCdkOverlay( config, TransferReviewComponent, null, this.transferForm.value );
        this.listenForCloseOverlayEvents( overlayRef, componentRef.instance );
    }

    private initFormGroup(): void {
        this.transferForm = this.fb.group( {
            [ TRANSFER_FORM_KEYS.FROM_ACCOUNT ]: [ { value: MY_ACCOUNT_BALANCE, disabled: true } ],
            [ TRANSFER_FORM_KEYS.TO_ACCOUNT ]: [ '', [ Validators.required ] ],
            [ TRANSFER_FORM_KEYS.AMOUNT ]: [ '', this.getAmountValidators() ]
        } );
    }

    private getAmountValidators(): any {
        return [
            Validators.required,
            Validators.min( 0 ),
            CustomValidators.lessThan( MY_ACCOUNT_BALANCE, ALLOWED_AMOUNT_BELOW_TOTAL_BALANCE )
        ];
    }

    private getTransferReviewOverlayStrategy( elementRef: ElementRef ): PositionStrategy {
        return this.overlay.position()
                   .flexibleConnectedTo( elementRef )
                   .withPositions( [
                        {
                            originX: ORIGIN_END,
                            originY: ORIGIN_TOP,
                            overlayX: OVERLAY_START,
                            overlayY: OVERLAY_TOP,
                            offsetX: TRANSFER_REVIEW_OFFSET_X_IN_PIXELS
                        }
                   ] );
    }

    private listenForCloseOverlayEvents( overlayRef: OverlayRef, component: TransferReviewComponent ): void {
        merge(
            overlayRef.backdropClick(),
            component.getCloseOverlaySubjectAsObservable()
        ).pipe(
            takeUntil( this.destroyed$ )
        ).subscribe( () => overlayRef.dispose() );
    }
}
