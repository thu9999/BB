import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingSpinnerComponent } from './loading-spinner.component';

describe( 'LoadingSpinnerComponent', () => {
    let component: LoadingSpinnerComponent;
    let fixture: ComponentFixture<LoadingSpinnerComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                LoadingSpinnerComponent
            ]
        } )
        .compileComponents();
    } ) );

    beforeEach(() => {
        fixture = TestBed.createComponent( LoadingSpinnerComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    describe( 'container', () => {
        it( 'should render loader', () => {
            const container = fixture.debugElement.query( By.css( '.loader-container' ) );
            const loader = container.query( By.css( '.loader' ) ).nativeElement;
            expect( loader.textContent ).toBe( '' );
        } );
    } );
} );
