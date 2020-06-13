import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {TransactionHttpService} from './transaction.http.service';

@Component({
  selector: 'transactions-viewer',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input()
  transactions: Array<Transaction>;
  @Input()
  walletId: bigint;

  @Output()
  updateWallet = new EventEmitter<boolean>();

  constructor(private transactionHttpService: TransactionHttpService) {
    this.transactions = new Array<Transaction>();
  }

  ngOnInit(): void {
    this.initWalletTransactions();
  }

  editTransaction(id: bigint) {

  }

  initWalletTransactions() {
    this.transactionHttpService.getWalletTransactions(this.walletId).subscribe((success: Array<Transaction>) => {
      this.transactions = success;
    }, error => {
    });
  }

  removeTransaction(transactionId: bigint): void {
    this.transactionHttpService.removeTransaction(this.walletId, transactionId).subscribe(success => {
      this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
      this.updateWallet.emit(true);
    }, error => {
    });

  }

}
