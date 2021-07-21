Cypress.Commands.add( 'tpiCheckValue', ( className, value ) => {
    cy.get( `app-text-prefix-input.${ className }` )
      .first()
      .find( 'input' )
      .should( 'have.value', value );
} );