import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';

import { TextPrefixInputComponent } from './text-prefix-input.component';

@NgModule( {
    declarations: [
        TextPrefixInputComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        TranslateModule
    ],
    exports: [
        TextPrefixInputComponent
    ]
} )
export class TextPrefixInputModule {}
