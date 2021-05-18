import { Component, OnInit } from '@angular/core';
import { Account } from '../models/Account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public message: String;
  public accounts: Account[];
  public selectedAccount: Account;
  public selectedId:number;

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
    this._accountService.getAccounts().subscribe(data => this.accounts = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  selectAccount(id) {
    this.selectedId = id;
    this._accountService.getAccount(id).subscribe(data => this.selectedAccount = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

}
