import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { CoreModule } from './core/core.module';
import { LoadingSpinnerModule } from './shared/components/loading-spinner/loading-spinner.module';
import { MockModule } from './mock/mock.module';

import { AppComponent } from './app.component';
import { AppInitializationService, SettingsService } from './core/services';
import { APP_LANGUAGE, LOCALE_TOKEN } from './shared';
import { environment } from 'src/environments/environment';

export function setupFactory( appInitializationService: AppInitializationService ): () => Promise<Object> {
    return () => appInitializationService.load();
}

export function localeFactory( settingsService: SettingsService ): Observable<string> {
    return settingsService.getSettingAsObservable( APP_LANGUAGE );
}


@NgModule( {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BbUIModule,
        CoreModule,
        TranslateModule.forRoot(),
        LoadingSpinnerModule,
        environment.production ? [] : MockModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: setupFactory,
            deps: [
                AppInitializationService
            ],
            multi: true
        },
        {
            provide: LOCALE_TOKEN,
            useFactory: localeFactory,
            deps: [
                SettingsService
            ]
        },
    ],
    bootstrap: [
        AppComponent
    ]
} )
export class AppModule {}
