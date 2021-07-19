import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppInitializationService, SettingsService } from './services';
import { ModuleTranslationLoader } from './loaders';

@NgModule( {
    imports: [
        HttpClientModule
    ],
    providers: [
        AppInitializationService,
        ModuleTranslationLoader,
        SettingsService
    ]
} )
export class CoreModule {}