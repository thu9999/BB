import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

@NgModule( {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BbUIModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
} )
export class AppModule {}
