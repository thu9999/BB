import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { CURRENCY_DEFAULT, CustomValidators, DECIMAL_NUMBER_DEFAULT, NumberHelper } from 'src/app/shared';
import { TRANSFER_FORM_KEYS } from './../shared';

const MY_ACCOUNT_BALANCE = 5000;
const ALLOWED_AMOUNT_BELOW_TOTAL_BALANCE = -500;

@Component( {
    selector: 'app-transfer-form',
    templateUrl: './transfer-form.component.html',
    styleUrls: [
        './transfer-form.component.scss'
    ]
} )
export class TransferFormComponent implements OnInit {
    readonly transferFormKeys = TRANSFER_FORM_KEYS;
    readonly amountMask = NumberHelper.getDecimalMask();
    readonly fromAccountMask = NumberHelper.getDecimalMask( DECIMAL_NUMBER_DEFAULT, false, `${ CURRENCY_DEFAULT } `)

    transferForm: FormGroup;
    
    constructor( private fb: FormBuilder,
                 private translateService: TranslateService ) {
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
}
