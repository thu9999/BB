import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockInterceptor } from './interceptors';

@NgModule( {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockInterceptor,
            multi: true
        }
    ]
} )
export class MockModule {}