import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public email: string;
  public name: string;
  public role: string;
  public access: boolean;
  public id: number;
  url = environment.baseUrl + '/out/authenticate';

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _router: Router,
    private _accountService: AccountService) { }

  async authenticate(credentials: any) {
    const headers = { 'content-type': 'application/json' };
    await this._http.post<any>(this.url, credentials, { 'headers': headers })
      .toPromise().then(data => {
        this._cookieService.set('authorization', data.jwt);
        this._cookieService.set('email', credentials.email);
        this._router.navigateByUrl('/myaccount');
      });
  }

  checkAuthentication() {
    if (this._cookieService.get('email')) {
      this._router.navigateByUrl('/');
    } 
  }

  populateAccountInfo() {
    this.email = this._cookieService.get('email');

    return new Promise((resolve, reject) => {

        this._accountService.getMyAccount(this.email).subscribe(
          data => {
            this.name = data.firstName + ' ' + data.lastName;
            this.role = data.role;
            this.access = data.schoolAccessAllowed;
            this.id = data.id;
            resolve(true);
          }
        );
    })
  }

  logout() {
    this._cookieService.remove('authorization');
    this._cookieService.remove('email');
    this._router.navigateByUrl('/login');
  }
}
