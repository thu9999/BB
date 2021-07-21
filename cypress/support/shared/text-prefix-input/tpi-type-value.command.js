Cypress.Commands.add( 'tpiTypeValue', ( className, value ) => {
    cy.get( `app-text-prefix-input.${ className }` )
      .first()
      .find( 'input' )
      .clear()
      .type( value );
} );