import { Injectable } from '@angular/core';

import { APP_LANGUAGE, DEFAULT_APP_LANGUAGE, BaseCacheService, APP_LOADING, DEFAULT_APP_LOADING } from '../../shared';

@Injectable()
export class SettingsService extends BaseCacheService {
    
    protected getInitialValue( key: string ): any {
        switch( key ) {
            case APP_LANGUAGE:
                return DEFAULT_APP_LANGUAGE;

            case APP_LOADING:
                return DEFAULT_APP_LOADING;

            default:
                return null;
        }
    }
}
