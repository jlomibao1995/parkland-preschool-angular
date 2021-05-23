
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from '../models/Account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public message: String;
  public success: boolean;
  public accounts: Account[];
  public selectedAccount: Account;
  public selectedId: number;

  public pages: number[] = [];
  public totalPages: number;
  public currentPage = 1;
  public numOfAccounts = 10;
  public totalAccounts: number;

  public pageForm: FormGroup;

  constructor(private _accountService: AccountService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.message = null;
    this.success = null;
    this.pageForm = this._formBuilder.group({
      numOfAccounts: [10],
      sort: [''],
      search: [''],
      role: ['']
    });

    this.goToPage(this.currentPage);
  }

  selectAccount(index) {
    this.selectedAccount = this.accounts[index];
    this.selectedId = this.selectedAccount.id;
  }

  changeAccountNum() {
    this.numOfAccounts = this.pageForm.get('numOfAccounts').value;
    this.goToPage(1);
  }

  goToPage(page) {
    this.pages = [];
    this.currentPage = page;
    let sort: String = this.pageForm.get('sort').value;
    let role: String = this.pageForm.get('role').value;
    let searchQuery: String = this.pageForm.get('search').value;

    this._accountService.getAccounts(this.currentPage, this.numOfAccounts, sort, role, searchQuery).subscribe(
      data => {
        this.accounts = data.content;
        this.totalPages = data.totalPages;
        this.totalAccounts = data.totalElements;

        //figure out which page buttons are visible
        let start = this.currentPage - 2;
        if (start <= 0) {
          start = 1;
        }

        for (let i = 0; i < 5; i++) {
          if (this.totalAccounts == 0) {
            break;
          }

          this.pages[i] = start + i;

          if (start + i == this.totalPages) {
            break;
          }
        }

      },
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  reload() {
    this.ngOnInit();
  }

  activateAccount(accountId) {
    const params = new HttpParams()
      .set('active', true);
    this._accountService.updateAccount(accountId, params).subscribe(
      data => this.successMessage("Account has been activated"),
      error => this.errorMessage(error)
    );
  }

  deactivateAccount(accountId) {
    const params = new HttpParams()
      .set('active', false);
    this._accountService.updateAccount(accountId, params).subscribe(
      data => this.successMessage("Account has been deactivated"),
      error => this.errorMessage(error)
    );
  }

  deleteAccount(accountId) {
    this._accountService.deleteAccount(accountId).subscribe(
      data => this.successMessage("Account has been deleted"),
      error => this.errorMessage(error)
    );
  }

  successMessage(successMesage: String) {
    this.reload();
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error: HttpErrorResponse) {
    this.reload();
    this.message = error.error.message;
    this.success = false;
  }

}
