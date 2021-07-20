import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe( 'HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let debugElement: DebugElement;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                HeaderComponent
            ],
            imports: [
                CommonModule
            ]
        } ).overrideComponent( HeaderComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } ).compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( HeaderComponent );
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    } );

    describe( 'container', () => {
        let container: DebugElement;

        beforeEach( () => {
            container = debugElement.query( By.css( '.header-container' ) );
        } );

        it( 'should have other classes', () => {
            const containerClassList = container.nativeElement.classList;
            expect( containerClassList.contains( 'pl-l' ) ).toBeTrue();
            expect( containerClassList.contains( 'pr-l' ) ).toBeTrue();
        } );

        it( 'should have height set', () => {
            component.height = 100;
            fixture.detectChanges();
            expect( container.nativeElement.style.height ).toBe( `${ component.height }px` );
        } );
    } );
} );
