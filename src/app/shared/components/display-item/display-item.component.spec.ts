import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DisplayItemComponent } from './display-item.component';

describe( 'DisplayItemComponent', () => {
    let component: DisplayItemComponent;
    let fixture: ComponentFixture<DisplayItemComponent>;
    let debugElement: DebugElement;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                DisplayItemComponent
            ],
            imports: [
                CommonModule
            ]
        } ).overrideComponent( DisplayItemComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        } )
        .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( DisplayItemComponent );
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    } );

    describe( 'template', () => {
        let container: DebugElement;

        beforeEach( () => {
            container = debugElement.query( By.css( '.display-item-container' ) );
        } );

        it( 'should have other classes', () => {
            const containerClassList = container.nativeElement.classList;
            expect( containerClassList.contains( 'pt-s' ) ).toBeTrue();
            expect( containerClassList.contains( 'pb-s' ) ).toBeTrue();
        } );

        describe( 'label', () => {
            let label: DebugElement;

            beforeEach( () => {
                label = container.query( By.css( '.label' ) );
            } );

            it( 'should have classes', () => {
                const contentClassList = label.nativeElement.classList;
                expect( contentClassList.contains( 'pt-s' ) ).toBeTrue();
                expect( contentClassList.contains( 'pb-s' ) ).toBeTrue();
            } );

            it( 'should have content', () => {
                component.label = 'LABEL';
                fixture.detectChanges();
                expect( label.nativeElement.textContent ).toBe( 'LABEL' );
            } );
        } );

        describe( 'content', () => {
            let content: DebugElement;

            beforeEach( () => {
                content = container.query( By.css( '.content' ) );
            } );

            it( 'should have classes', () => {
                const contentClassList = content.nativeElement.classList;
                expect( contentClassList.contains( 'pt-s' ) ).toBeTrue();
                expect( contentClassList.contains( 'pb-s' ) ).toBeTrue();
            } );

            it( 'should have content', () => {
                component.content = 'CONTENT';
                fixture.detectChanges();
                expect( content.nativeElement.textContent ).toBe( 'CONTENT' );
            } );
        } );
    } );
} );
