import { AccountCurrency } from './account-currency.model';

export class Transaction {
    amountCurrency: AccountCurrency;
    type: string;
    creditDebitIndicator: string;
}