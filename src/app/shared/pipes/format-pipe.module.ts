import { NgModule } from '@angular/core';

import { DelegateHelperPipe } from './delegate-helper.pipe';
import { FinancialFormatPipe } from './financial-format.pipe';

@NgModule( {
    declarations: [
        DelegateHelperPipe,
        FinancialFormatPipe
    ],
    exports: [
        DelegateHelperPipe,
        FinancialFormatPipe
    ]
} )
export class FormatPipeModule {}