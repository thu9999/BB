Cypress.Commands.add( 'tpiCheckPrefix', ( className, prefix ) => {
    cy.get( `app-text-prefix-input.${ className }` )
      .first()
      .find( '.prefix' )
      .should( $prefix => expect( $prefix.text().trim() ).to.equal( prefix ) );
} );