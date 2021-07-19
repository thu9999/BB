import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TRANSLATION_MODULES } from './../constants';

@Injectable()
export class ModuleTranslationLoader {
    private loadedModuleTranslations = {};

    constructor( private http: HttpClient,
                 private translateService: TranslateService ) {
    }

    load( lang: string ): Promise<boolean[]> {
        const promises = TRANSLATION_MODULES.map( module => {
            if ( !this.loadedModuleTranslations[ module ] ) {
                this.loadedModuleTranslations[ module ] = {};
            }

            if ( !this.loadedModuleTranslations[ module ][ lang ] ) {
                return this.http.get( `/assets/i18n/${ module }/${ lang }.json` ).pipe(
                    catchError( () => of( {} ) )
                ).toPromise().then( ( res: Object ) => {
                        this.loadedModuleTranslations[ module ][ lang ] = res;
                        this.translateService.setTranslation( lang, res, true );
                        return true;
                    } );
            }
            
            return Promise.resolve( true );
        } );
        return Promise.all( promises );
    }

}
