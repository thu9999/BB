Cypress.Commands.add( 'tpiClick', ( className, value ) => {
    cy.get( `app-text-prefix-input.${ className }` )
      .first()
      .find( 'input' )
      .click();
} );