import { HTTP_CODES, HTTP_REQUEST_METHODS } from '../../shared/contants';
import { APP_CONFIG } from '../../shared/contants/config';

const FROM_ACCOUNT_CLASS_NAME = 'from-account';
const TO_ACCOUNT_CLASS_NAME = 'to-account';
const AMOUNT_CLASS_NAME = 'amount';

const TO_ACCOUNT_TYPE_VALUE = 'To account name';
const VALID_AMOUNT = '123.99';
const INVALID_AMOUNT = '50001';

describe( 'Transfer form', () => {
    beforeEach( () => {
        cy.intercept( HTTP_REQUEST_METHODS.GET, '/dev/transactions', {
            fixture: './transactions/transaction-list'
        } ).as( 'getTransactionList' );

        cy.visit( `${ APP_CONFIG.BASE_URL }/transaction` );
        cy.wait( '@getTransactionList' );
    } );

    it( 'should render transfer form', () => {
        cy.get( 'app-transfer-form' )
          .find( '.container' )
          .within( () => {
                cy.get( '.header-text' )
                  .should( $header => expect( $header.text().trim() ).to.equal( 'Make transfer' ) ); 

                cy.get( 'form' )
                  .within( () => {
                        cy.tpiCheckLabel( FROM_ACCOUNT_CLASS_NAME, 'From Account' );
                        cy.tpiCheckPrefix( FROM_ACCOUNT_CLASS_NAME, 'My Personal Account:' );
                        cy.tpiCheckValue( FROM_ACCOUNT_CLASS_NAME, '€5,000');

                        cy.tpiClick( TO_ACCOUNT_CLASS_NAME );
                        cy.tpiCheckError( TO_ACCOUNT_CLASS_NAME, 'This field is required' );

                       
                        cy.tpiCheckLabel( TO_ACCOUNT_CLASS_NAME, 'To Account' );
                        cy.tpiTypeValue( TO_ACCOUNT_CLASS_NAME, TO_ACCOUNT_TYPE_VALUE)
                        cy.tpiCheckValue( TO_ACCOUNT_CLASS_NAME, TO_ACCOUNT_TYPE_VALUE );

                        cy.tpiClick( AMOUNT_CLASS_NAME );
                        cy.tpiCheckError( AMOUNT_CLASS_NAME, 'This field is required' );

                        
                        cy.tpiCheckLabel( AMOUNT_CLASS_NAME, 'Amount' );
                        cy.tpiTypeValue( AMOUNT_CLASS_NAME, VALID_AMOUNT);
                        cy.tpiCheckValue( AMOUNT_CLASS_NAME, VALID_AMOUNT );

                        cy.tpiTypeValue( AMOUNT_CLASS_NAME, '123abc456,.99');
                        cy.tpiCheckValue( AMOUNT_CLASS_NAME, '123,456.99' );

                        cy.tpiTypeValue( AMOUNT_CLASS_NAME, INVALID_AMOUNT)
                        cy.tpiCheckValue( AMOUNT_CLASS_NAME, '50,001' );

                        cy.tpiCheckError( AMOUNT_CLASS_NAME, 'There is not enough balance' );

                        cy.tpiTypeValue( AMOUNT_CLASS_NAME, VALID_AMOUNT);
                  } );

                cy.get( '.actions' )
                  .find( 'app-submit-button' )
                  .find( 'button' )
                  .click();

                cy.document()
                  .its( 'body' )
                  .find( 'app-transfer-review' )
                  .find( '.transfer-review-header' )
                  .within( () => {
                        cy.get( '.transfer-review-header-text' )
                          .should( $header => expect( $header.text().trim() ).to.equal( 'Review transfer' ) );

                        cy.get( '.close' )
                          .find( 'button' )
                          .click();
                  } );

                cy.document()
                  .its( 'body' )
                  .find( 'app-transfer-review' )
                  .should( 'not.exist' );

                cy.get( 'form' )
                  .within( () => {
                        cy.tpiCheckValue( TO_ACCOUNT_CLASS_NAME, TO_ACCOUNT_TYPE_VALUE );
                        cy.tpiTypeValue( AMOUNT_CLASS_NAME, VALID_AMOUNT);
                  } );

                cy.get( '.actions' )
                  .find( 'app-submit-button' )
                  .find( 'button' )
                  .click();

                cy.document()
                  .its( 'body' )
                  .find( 'app-transfer-review' )
                  .within( () => {
                        cy.get( '.transfer-review-content' )
                          .within( () => {
                                cy.get( '.confirmation')
                                  .should( $confirmation => expect( $confirmation.text().trim() ).to.equal( 'Are you ready to send out this transfer?' ) );
        
                                cy.diCheckLabelContent( 'to-account', 'It will be send to account:', TO_ACCOUNT_TYPE_VALUE );
                                cy.diCheckLabelContent( 'amount', 'With the amount of:', `€${VALID_AMOUNT}` );
                        } );

                        cy.get( '.actions' )
                          .find( '.close' )
                          .click();
                  } )

                cy.document()
                  .its( 'body' )
                  .find( 'app-transfer-review' )
                  .should( 'not.exist' );

                cy.get( 'form' )
                  .within( () => {
                        cy.tpiCheckValue( TO_ACCOUNT_CLASS_NAME, TO_ACCOUNT_TYPE_VALUE );
                        cy.tpiCheckValue( AMOUNT_CLASS_NAME, VALID_AMOUNT);
                  } );

                cy.get( '.actions' )
                  .find( 'app-submit-button' )
                  .find( 'button' )
                  .click();

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

                const NUMBER_OF_TRANCTION_ITEM = 11;
                cy.document()
                  .its( 'body' )
                  .find( 'app-transaction-list' )
                  .find( 'app-transaction-item' )
                  .should( 'have.length', NUMBER_OF_TRANCTION_ITEM );

                cy.document()
                  .its( 'body' )
                  .find( 'app-transfer-review' )
                  .find( '.actions' )
                  .find( '.submit' )
                  .click();

                cy.document()
                  .its( 'body' )
                  .find( 'app-loading-spinner' )
                  .should( 'exist' );

                cy.wait( '@createTransfer' );
                cy.wait( '@getTransactionDetails' );

                cy.document()
                  .its( 'body' )
                  .find( 'app-transfer-review' )
                  .should( 'not.exist' );

                cy.get( 'form' )
                  .within( () => {
                        cy.tpiCheckValue( TO_ACCOUNT_CLASS_NAME, '' );
                        cy.tpiCheckValue( AMOUNT_CLASS_NAME, '');
                  } );

                cy.document()
                  .its( 'body' )
                  .find( 'app-transaction-list' )
                  .find( 'app-transaction-item' )
                  .should( 'have.length', NUMBER_OF_TRANCTION_ITEM + 1 );
          } );
    } );
} );