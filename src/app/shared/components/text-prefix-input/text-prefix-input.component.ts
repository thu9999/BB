import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessorDirective } from '../../directives';

@Component( {
    selector: 'app-text-prefix-input',
    templateUrl: './text-prefix-input.component.html',
    styleUrls: [
        './text-prefix-input.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => TextPrefixInputComponent ),
            multi: true
        }
    ]
} )
export class TextPrefixInputComponent extends BaseControlValueAccessorDirective {
    @Input() label = '';
    @Input() prefix = '';
    @Input() prefixIcon = '';
    @Input() placeholder = '';
    @Input() error = '';
    @Input() textMask: any;
}
