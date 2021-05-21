import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.baseUrl + '/account'

  constructor(private _http: HttpClient) { }

  getAccounts(page, pageSize, sort, role, searchQuery) {
    page = page -1;

    const params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)
    .set('sort', sort)
    .set('role', role)
    .set('search', searchQuery);

    let url = this.baseUrl + '/accounts/pages';
    return this._http.get<any>(url, {params})
    .pipe(catchError(this.errorHandler));
  }

  getAccount(id) {
    let url = this.baseUrl + '/' + id;
    return this._http.get<Account>(url)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
