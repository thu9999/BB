import { DestroySubscriptionDirective } from "./destroy-subscription.directive";

describe( 'DestroySubscriptionDirective', () => {
    let directive: DestroySubscriptionDirective;

    beforeEach( () => {
        directive = new DestroySubscriptionDirective();
    } );

    describe( 'ngOnDestroy', () => {
        it( 'should emit once and complete', () => {
            const nextSpy = spyOn( ( directive as any ).destroyed$, 'next' )
            const completeSpy = spyOn( ( directive as any ).destroyed$, 'complete' );

            directive.ngOnDestroy();

            expect( nextSpy ).toHaveBeenCalled();
            expect( completeSpy ).toHaveBeenCalled();
        } );
    } );
} );