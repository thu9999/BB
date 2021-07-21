Cypress.Commands.add( 'tpiCheckError', ( className, error ) => {
    cy.get( `app-text-prefix-input.${ className }` )
      .first()
      .find( '.text-error' )
      .should( $error => expect( $error.text().trim() ).to.equal( error ) );
} );