import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { BbUIModule } from 'src/app/bb-ui/bb-ui.module';
import { DisplayItemModule } from '../../shared/components/display-item/display-item.module';
import { HeaderModule } from '../../shared/components/header/header.module';
import { TextPrefixInputModule } from '../../shared/components/text-prefix-input/text-prefix-input.module';
import { TransactionRoutingModule } from './transaction-routing.module';

import { TransactionComponent } from './transaction/transaction.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransferReviewComponent } from './transfer-review/transfer-review.component';

import { CdkOverlayService, FormatPipeModule } from 'src/app/shared';
import { TransactionService } from './shared';

@NgModule( {
    declarations: [
        TransactionComponent,
        TransferFormComponent,
        TransactionListComponent,
        TransferReviewComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        BbUIModule,
        DisplayItemModule,
        FormatPipeModule,
        HeaderModule,
        OverlayModule,
        TextPrefixInputModule,
        TransactionRoutingModule,
        TranslateModule
    ],
    providers: [
        CdkOverlayService,
        TransactionService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
} )
export class TransactionModule { }
