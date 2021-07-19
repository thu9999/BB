import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { AppInitializationService } from './core/services';

export function setupFactory( appInitializationService: AppInitializationService ): () => Promise<Object> {
    return () => appInitializationService.load();
}

@NgModule( {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BbUIModule,
        CoreModule,
        TranslateModule.forRoot(),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: setupFactory,
            deps: [
                AppInitializationService
            ],
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
} )
export class AppModule {}
