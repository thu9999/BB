import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'delegateHelper'
} )
export class DelegateHelperPipe implements PipeTransform {
    transform<T, R>( value: T, fn: ( data: T, ...args: any[] ) => R, ...args: any[] ): R {
        return fn( value, ...args );
    }
}
