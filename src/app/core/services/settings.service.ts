import { Injectable } from '@angular/core';

import { APP_LANGUAGE, APP_LANGUAGE_DEFAULT, BaseCacheService } from '../../shared';

@Injectable()
export class SettingsService extends BaseCacheService {
    
    protected getInitialValue( key: string ): any {
        switch( key ) {
            case APP_LANGUAGE:
                return APP_LANGUAGE_DEFAULT;
            default:
                return null;
        }
    }
}
