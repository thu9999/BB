import { APP_CONFIG, HTTP_CODES, HTTP_REQUEST_METHODS } from '../../shared/contants';

const TO_ACCOUNT_CLASS_NAME = 'to-account';
const AMOUNT_CLASS_NAME = 'amount';

const TO_ACCOUNT_TYPE_VALUE = 'To account name';
const VALID_AMOUNT = '123.99';

const SEARCH_VALUE = 'th';

describe( 'Transaction list', () => {
    beforeEach( () => {
        cy.intercept( HTTP_REQUEST_METHODS.GET, '/dev/transactions', {
            fixture: './transactions/transaction-list'
        } ).as( 'getTransactionList' );

        cy.visit( `${ APP_CONFIG.BASE_URL }/transaction` );
        cy.wait( '@getTransactionList' );
    } );

    it( 'should display a list of transaction', () => {
        cy.get( 'app-transaction-list' )
          .within( () => {
                cy.get( '.header-text' )
                  .should( $header => expect( $header.text().trim() ).to.equal( 'Transaction list' ) );

                cy.get( 'app-transaction-item' )
                  .should( 'have.length', 11 );

                cy.get( 'app-filter' )
                  .find( 'input' )
                  .type( SEARCH_VALUE );

                cy.get( 'app-transaction-item' )
                  .should( 'have.length', 3 )
                  .each( $item => {
                        cy.wrap( $item )
                          .find( 'div[data-test-hook="transactionMerchantName"]' )
                          .should( $name => expect( $name.text().trim().toLowerCase() ).to.include( SEARCH_VALUE ) )
                  } );
          } );

        cy.get( 'app-transfer-form' )
          .within( () => {
                cy.tpiTypeValue( TO_ACCOUNT_CLASS_NAME, TO_ACCOUNT_TYPE_VALUE)
                cy.tpiTypeValue( AMOUNT_CLASS_NAME, VALID_AMOUNT);

                cy.get( '.actions' )
                  .find( 'button' )
                  .click();
          } );

        cy.intercept( HTTP_REQUEST_METHODS.POST, '/dev/transactions', req => {
            req.reply( {
                statusCode: HTTP_CODES.OK,
                delay: 1000,
                fixture: './transactions/create-transfer'
            } );
        } ).as( 'createTransfer' );

        cy.intercept( HTTP_REQUEST_METHODS.GET, '/dev/transactions/*', {
            fixture: './transactions/transaction'
        } ).as( 'getTransactionDetails' );

        cy.get( 'app-transfer-review' )
          .find( '.actions' )
          .find( '.submit' )
          .click();

        cy.wait( '@createTransfer' );
        cy.wait( '@getTransactionDetails' );

        cy.get( 'app-transaction-list' )
          .find( 'app-transaction-item' )
          .should( 'have.length', 3 );

        cy.get( 'app-transaction-list' )
          .find( 'app-filter' )
          .find( 'input' )
          .clear()
          .type( 'backbase' );

        cy.get( 'app-transaction-list' )
          .find( 'app-transaction-item' )
          .should( 'have.length', 2 );

        cy.get( 'app-transfer-form' )
          .within( () => {
                cy.tpiTypeValue( TO_ACCOUNT_CLASS_NAME, TO_ACCOUNT_TYPE_VALUE)
                cy.tpiTypeValue( AMOUNT_CLASS_NAME, VALID_AMOUNT);

                cy.get( '.actions' )
                  .find( 'button' )
                  .click();
          } );

        cy.get( 'app-transfer-review' )
          .find( '.actions' )
          .find( '.submit' )
          .click();

        cy.wait( '@createTransfer' );
        cy.wait( '@getTransactionDetails' );

        cy.get( 'app-transaction-list' )
          .find( 'app-transaction-item' )
          .should( 'have.length', 3 );
    } );
} );