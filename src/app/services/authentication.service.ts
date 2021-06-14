import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';
import { AccountService } from './account.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: Account;
  url = environment.baseUrl + '/out/';

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _router: Router,
    private _accountService: AccountService) { }

  async authenticate(credentials: any) {
    const headers = { 'content-type': 'application/json' };
    await this._http.post<any>(this.url + 'authenticate', credentials, { 'headers': headers })
      .toPromise().then(data => {
        // this._cookieService.set('authorization', data.jwt);
        this._cookieService.set('email', credentials.email);
        this._router.navigateByUrl('/myaccount');
      });
  }

  authenticated() {
    if (this._cookieService.get('email')) {
      return true;
    }
    return false;
  }

  populateAccountInfo() {
    return new Promise((resolve, reject) => {

      this._accountService.getMyAccount().subscribe(
        data => {
          this.currentUser = data;
          resolve(true);
        }
      );
    })
  }

  logout() {
    this._http.post<any>(this.url + 'logout', {}).subscribe(
      data => {
        this._cookieService.remove('email');
        this._router.navigateByUrl('/login');
      }
    )
  }
}
