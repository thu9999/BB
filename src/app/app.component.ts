import { Component } from '@angular/core';

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
}
