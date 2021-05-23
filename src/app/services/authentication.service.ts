import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authenticated: boolean = false;
  url = environment.baseUrl + '/out/authenticate';

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _router: Router) { }

  async authenticate(credentials: any) {
    const headers = { 'content-type': 'application/json' };
    await this._http.post<any>(this.url, credentials, { 'headers': headers })
      .toPromise().then(data => {
        this._cookieService.set('authorization', data.jwt);
        this._cookieService.set('email', credentials.email);
        this.authenticated = true;
        this._router.navigateByUrl('/admin/accounts');
      });
  }

  logout(){
    this._cookieService.remove('authorization');
    this._cookieService.remove('email');
  }
}
