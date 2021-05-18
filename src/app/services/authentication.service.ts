import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authenticated: boolean = false;
  baseUrl = environment.baseUrl + '/out/authenticate';

  constructor(private _http: HttpClient, private _cookieService: CookieService) { }

  async authenticate(credentials: any) {
    console.log(this.baseUrl);
    const headers = { 'content-type': 'application/json' };
    await this._http.post<any>(this.baseUrl, credentials, { 'headers': headers })
      .toPromise().then(data => {
        this._cookieService.set('authorization', data.jwt);
        this.authenticated = true;
      });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
