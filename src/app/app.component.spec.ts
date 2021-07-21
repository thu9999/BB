import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { SettingsService } from './core/services';

@Component( {
    selector: 'app-logo'
} )
class LogoDummyComponent {}

@Component( {
    selector: 'router-outlet'
} )
class RouterOutletDummyComponent {}

@Component( {
    selector: 'app-footer'
} )
class FooterDummyComponent {}

@Component( {
    selector: 'app-loading-spinner'
} )
class LoadingSpinnerDummyComponent {}

describe( 'AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let debugElement: DebugElement;
    
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
        declarations: [
            AppComponent,
            LogoDummyComponent,
            RouterOutletDummyComponent,
            FooterDummyComponent,
            LoadingSpinnerDummyComponent
        ],
        imports: [
            CommonModule
        ],
        providers: [
            SettingsService
        ]
        } ).overrideComponent( AppComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( AppComponent );
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    } );

    describe( 'container', () => {
        let container: DebugElement;

        beforeEach( () => {
            container = debugElement.query( By.css( '.container' ) );
        } );

        it( 'should render logo', () => {
            const logo = container.query( By.css( '.logo' ) );
            expect( logo.nativeElement.style.height ).toBe( `${ component.logoHightInPixels }px` );

            const appLogo = logo.query( By.css( 'app-logo' ) );
            expect( appLogo ).toBeTruthy();
        } );

        describe( 'content', () => {
            let content: DebugElement;

            beforeEach( () => {
                content = container.query( By.css( '.content' ) );
            } );

            it( 'should have margin-top set', () => {
                expect( content.nativeElement.style.marginTop ).toBe( `${ component.logoHightInPixels }px` );
            } );

            it( 'should render background image', () => {
                const backgroundImage = content.query( By.css( '.background-image' ) );
                expect( backgroundImage ).toBeTruthy();
                expect( backgroundImage.nativeElement.style.top ).toBe( `${ component.footerHeightInPixels }px` );
            } );

            it( 'should contain routing outlet', () => {
                expect( content.query( By.css( 'router-outlet' ) ) ).toBeTruthy();
            } );
        } );

        it( 'should render footer', () => {
            const footer = container.query( By.css( '.footer' ) );
            expect( footer.nativeElement.style.height ).toBe( `${ component.footerHeightInPixels }px` );
            
            expect( footer.query( By.css( 'app-footer' ) ) ).toBeTruthy();
        } );
    } );

    describe( 'loading spinner', () => {
        it( 'should not be rendered when loading is false', () => {
            component.loading$ = of( false );
            fixture.detectChanges();
            expect( debugElement.query( By.css( 'app-loading-spinner' ) ) ).toBeNull();
        } );

        it( 'should be rendered when loading is true', () => {
            component.loading$ = of( true );
            fixture.detectChanges();
            expect( debugElement.query( By.css( 'app-loading-spinner' ) ) ).toBeTruthy();
        } );
    } );
} );
