Cypress.Commands.add( 'diCheckLabelContent', ( className, label, content ) => {
    cy.get( `app-display-item.${ className }` )
      .find( '.display-item-container')
      .within( () => {
            cy.get( '.label' )
              .should( $label => expect( $label.text().trim() ).to.equal( label ) );

              cy.get( '.content' )
                .should( $content => expect( $content.text().trim() ).to.equal( content ) );
      } )
} );