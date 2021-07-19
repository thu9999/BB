import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';

import { OVERLAY_DATA_TOKEN } from './../constants';

@Injectable() 
export class CdkOverlayService<T> {
    constructor( private overlay: Overlay  ) {
    }

    createCdkOverlay( config: OverlayConfig, component: ComponentType<T>, viewContainerRef: ViewContainerRef = null, injectedData = null ): { overlayRef: OverlayRef, componentRef: ComponentRef<T> } {
        const overlayRef = this.overlay.create( config );
        const componentRef = overlayRef.attach( new ComponentPortal(
            component,
            viewContainerRef,
            this.createInjector( injectedData )
        ) );
        return { overlayRef, componentRef };
    }

    private createInjector( data: any ): Injector {
        const injector = Injector.create( {
            providers: [
                { provide: OVERLAY_DATA_TOKEN, useValue: data }
            ]
        } );
        return injector;
    }
}