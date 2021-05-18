import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl + '/account'

  constructor(private _http: HttpClient) { }

  getAccounts() {
    let url = this.baseUrl + '/accounts'
    return this._http.get<Account[]>(url)
    .pipe(catchError(this.errorHandler));
  }

  getAccount(index) {
    let url = this.baseUrl + '/' + index;
    return this._http.get<Account>(url)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
