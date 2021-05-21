
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
  public accounts: Account[];
  public selectedAccount: Account;
  public selectedId:number;
  public pages: number[] = [];

  public totalPages: number;
  public currentPage = 1;
  public numOfAccounts = 10;
  public totalAccounts: number;

  public pageForm: FormGroup;

  constructor(private _accountService: AccountService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pageForm = this._formBuilder.group({
      numOfAccounts: [10],
      sort: [''],
      search: [''],
      role: ['']
    });

    this.goToPage(this.currentPage);  
  }

  selectAccount(id) {
    this.selectedId = id;
    this._accountService.getAccount(id).subscribe(data => this.selectedAccount = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
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
        
        //figure out which page buttons are visible
        let start = this.currentPage - 2;
        if (start <= 0) {
          start = 1;
        }

        for (let i = 0; i < 5; i++) {
          this.pages[i] = start + i;

          if (start + i == this.totalPages) {
            break;
          }
        }

        this.totalAccounts = data.totalElements;
      },
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  clearFilter() {
    this.ngOnInit();
  }

}
