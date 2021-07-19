import { TransferTO } from '../../../../core/models';
import { TransferFormValue } from '../models';
import { NumberHelper } from '../../../../shared/helpers';

export class TransactionHelper {
    
    static createTransferTO( transferFormValue: TransferFormValue ): TransferTO {
        const transferTO = new TransferTO();
        transferTO.toAccount = transferFormValue.toAccount.trim();
        transferTO.amount = NumberHelper.toNumber( transferFormValue.amount );
        return transferTO;
    }
}