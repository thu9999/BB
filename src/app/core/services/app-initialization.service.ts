import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { APP_LANGUAGE, DEFAULT_APP_LANGUAGE, LocalStorageHelper } from '../../shared';
import { ModuleTranslationLoader } from '../loaders';
import { SettingsService } from './settings.service';

@Injectable()
export class AppInitializationService {

    constructor( private settingsService: SettingsService,
                 private translationLoader: ModuleTranslationLoader,
                 private translateService: TranslateService ) {
    }
    
    load(): Promise<boolean[]> {
        const storageLanguage = LocalStorageHelper.getItem( APP_LANGUAGE );
        const language = storageLanguage || DEFAULT_APP_LANGUAGE;

        this.translateService.setDefaultLang( language );

        return new Promise<boolean[]>( resolve => {
            this.settingsService.getSettingAsObservable( APP_LANGUAGE ).subscribe( lang => {
                this.translateService.use( lang );
                this.translationLoader.load( lang ).then( resolve );
            } );
        } );
    }
}