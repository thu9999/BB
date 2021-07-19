import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule( {
    declarations: [TransactionComponent],
    imports: [
        CommonModule,
        TransactionRoutingModule
    ]
} )
export class TransactionModule { }
