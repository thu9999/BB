import { TransferFormValue } from '../models';
import { TransactionHelper } from './transaction.helper';

describe( 'TransactionHelper', () => {
    
    describe( 'createTransferTO', () => {
        it( 'should create TransferTO', () => {
            const transferFormValue: TransferFormValue = {
                fromAccount: 'FROM_ACCOUNT',
                toAccount: 'TO_ACCOUNT',
                amount: '100,000.99'
            }

            const transferTO = TransactionHelper.createTransferTO( transferFormValue );

            expect( transferTO.toAccount ).toBe( 'TO_ACCOUNT' );
            expect( transferTO.amount ).toBe( 100000.99 );
        } );
    } );
} );