Cypress.Commands.add( 'tpiCheckLabel', ( className, label ) => {
    cy.get( `app-text-prefix-input.${ className }` )
      .first()
      .find( '.label' )
      .should( $label => expect( $label.text().trim() ).to.equal( label ) );
} );