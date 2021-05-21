import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = environment.baseUrl + '/registration';

  constructor(private _http: HttpClient) { }

  getRegistrations(page, pageSize) {
    let url = this.baseUrl + '/registrations/pages?page=' + page + '&pageSize=' + pageSize;
    page = page - 1;
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  getRegistration(id) {
    let url = this.baseUrl +'/' + id;
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
