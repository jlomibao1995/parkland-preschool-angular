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
  public status = {
    registered : 'REGISTERED',
    waitlisted: 'WAIT_LISTED',
    pending: 'PENDING',
    unregistered: 'UNREGISTERED',
    spotOffered : 'SPOT_OFFERED'
  };

  constructor(private _http: HttpClient) { }

  getRegistrations(page, pageSize, classroom, status, searchQuery) {
    let url = this.baseUrl + '/admin/registrations/pages';
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

  registerChild(registration) {
    return this._http.post<any>(this.baseUrl + '/register', registration)
    .pipe(catchError(this.errorHandler));
  }

  deleteRegistration(id) {
    return this._http.delete<any>(this.baseUrl + '/admin/' + id)
    .pipe(catchError(this.errorHandler));
  }
  
  getRegistrationPDF(id: number){
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
    };

    this._http.get<any>(this.baseUrl + '/admin/pdf/' + id, httpOptions).subscribe(
      data => {
        let file = new Blob([data], {type : 'application/pdf'});
          let url = URL.createObjectURL(file);
          window.open(url, '_blank');
      }, error => console.log(error)
    );

    //window.open(this.baseUrl + '/admin/registration/pdf/' + id, '_blank');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
