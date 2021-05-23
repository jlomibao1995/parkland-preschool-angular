import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  getRegistrations(page, pageSize, classroom, status, searchQuery) {
    let url = this.baseUrl + '/registrations/pages';
    page = page - 1;

    const params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)
    .set('classroom', classroom)
    .set('status', status)
    .set('search', searchQuery);

    return this._http.get<any>(url, {params})
    .pipe(catchError(this.errorHandler));
  }

  getRegistration(id) {
    let url = this.baseUrl +'/' + id;
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  updateRegistration(id, params: HttpParams) {
    return this._http.put<any>(this.baseUrl +'/' + id, {}, {params})
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
