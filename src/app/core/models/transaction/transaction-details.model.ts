import { Dates } from './dates.model';
import { Merchant } from './merchant.model';
import { Transaction } from './transaction.model';

export class TransactionDetails {
    categoryCode: string;
    dates: Dates;
    transaction: Transaction;
    merchant: Merchant;
}