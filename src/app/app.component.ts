import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsService } from './core/services';
import { APP_LOADING } from './shared';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss'
    ]
} )
export class AppComponent {
    readonly logoHightInPixels = 64;
    readonly footerHeightInPixels = 64;

    loading$: Observable<boolean>;

    constructor( private settingsService: SettingsService ) {
        this.loading$ = this.settingsService.getSettingAsObservable( APP_LOADING );
    }
}
