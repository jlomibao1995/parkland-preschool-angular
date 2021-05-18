import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  public baseUrl = environment.baseUrl + '/classroom';

  constructor(private _http: HttpClient) { }

  getClasses() {
    let url = this.baseUrl + '/classrooms';
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  getClass(classId) {
    let url = this.baseUrl + '/' + classId;
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
