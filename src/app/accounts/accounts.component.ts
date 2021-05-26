
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
  public roles;
  public selectedId: number;

  public pages: number[] = [];
  public totalPages: number;
  public currentPage = 1;
  public numOfAccounts = 10;
  public totalAccounts: number;

  public pageForm: FormGroup;
  public columnStates = {
    contactInfo: true,
    name: true,
    role: false,
    child: false,
    actions: true,
    lastLoginDate: false,
    creationDate: false,
    address: false,
    phoneNumbers: false
  }

  constructor(private _accountService: AccountService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.roles = this._accountService.roles;
    
    this.message = null;
    this.success = null;
    this.pageForm = this._formBuilder.group({
      numOfAccounts: [this.numOfAccounts],
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

        if(this.currentPage + 2 > this.totalPages) {
          start = this.currentPage - 3;
        }

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

      }, error => console.log(error.error.message)
    );
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
    this.goToPage(this.currentPage);
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error: HttpErrorResponse) {
    this.goToPage(this.currentPage);
    this.message = error.error.message;
    this.success = false;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

  toggleColumnState(event) {
    let checked = false;
    if (event.target.checked) {
      checked = true;
    }

    switch (event.srcElement.name) {
      case 'name':
        this.columnStates.name = checked;
        break;
      case 'contactInfo':
        this.columnStates.contactInfo = checked;
        break;
      case 'role':
        this.columnStates.role = checked;
        break;
      case 'child':
        this.columnStates.child = checked;
        break;
      case 'lastLoginDate':
        this.columnStates.lastLoginDate = checked;
        break;
      case 'creationDate':
        this.columnStates.creationDate = checked;
        break;
      case 'actions':
        this.columnStates.actions = checked;
    }
  }

}
