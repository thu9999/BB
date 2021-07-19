import { Directive } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { DestroySubscriptionDirective } from './destroy-subscription.directive';

@Directive()
export abstract class BaseControlValueAccessorDirective extends DestroySubscriptionDirective implements ControlValueAccessor {
    control = new FormControl();

    onTouched = () => {};

    writeValue( value: any ): void {
        this.control.setValue( value );
    }

    registerOnChange( fn: ( _: any ) => void ): void {
        this.control.valueChanges.pipe(
            takeUntil( this.destroyed$ )
        ).subscribe( fn );
    }

    registerOnTouched( fn: () => {} ): void {
        this.onTouched = fn;
    }

    setDisabledState( isDisabled: boolean ) {
        isDisabled ? this.control.disable() : this.control.enable();
    }
}