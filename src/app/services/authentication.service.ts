import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';
import { AccountService } from './account.service';
import { CookieService } from './cookie.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: Account;
  url = environment.baseUrl + '/out/';

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _router: Router,
    private _accountService: AccountService) { }

  authenticate(credentials: any) {
    return this._http.post<any>(this.url + 'authenticate', credentials)
    .pipe(catchError(this.errorHandler)); 
  }

  authenticated() {
    if (this._cookieService.get('email') != null && this._cookieService.get('email').length > 0) {
      return true;
    }
    return false;
  }

  // populateAccountInfo() {
  //   return new Promise((resolve, reject) => {

  //     this._accountService.getMyAccount().subscribe(
  //       data => {
  //         this.currentUser = data;
  //         resolve(true);
  //       }
  //     );
  //   })
  // }

  logout() {
    return this._http.post<any>(this.url + 'logout', {})
    .pipe(catchError(this.errorHandler)); 
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
