import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.baseUrl + '/account'
  private headers = { 'content-type': 'application/json' };
  public roles = {
    admin : 'ADMIN',
    staff : 'STAFF',
    user : 'USER'
  }

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

  addAccount(account: any) {   
    return this._http.post<any>(this.baseUrl, account, { 'headers': this.headers})
    .pipe(catchError(this.errorHandler));
  }

  updateAccount(id, params: HttpParams) {
    return this._http.put<any>(this.baseUrl + "/" + id, {}, {params})
    .pipe(catchError(this.errorHandler));
  }

  deleteAccount(id) {
    return this._http.delete<any>(this.baseUrl + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  registerAccount(account: any, fallBackUrl) {
   return this._http.post<any>(environment.baseUrl + '/out/account/register?fallBackUrl=' + fallBackUrl, account, { 'headers': this.headers})
    .pipe(catchError(this.errorHandler));
  }

  activateAccount(uuid: string) {
    return this._http.get<any>(environment.baseUrl + '/out/account/activate/' + uuid)
    .pipe(catchError(this.errorHandler));
  }

  requestPasswordChange(email: string, params: HttpParams) {
    return this._http.get<any>(environment.baseUrl + '/out/account/request_reset/' + email, {params})
    .pipe(catchError(this.errorHandler));
  }

  changePassword(uuid: string, params: HttpParams) {
    return this._http.get<any>(environment.baseUrl + '/out/account/reset_password/' + uuid, {params})
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
