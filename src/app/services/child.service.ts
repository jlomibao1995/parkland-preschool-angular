import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Child } from '../models/Child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private baseUrl = environment.baseUrl + '/child'
  private headers = { 'content-type': 'application/json' };
  public contactsType = {
    guardian : 'GUARDIAN',
    emergency : 'EMERGENCY',
    other : 'OTHER',
    pickup : 'PICKUP'
  }

  public gender = {
    boy : 'MALE',
    girl : 'FEMALE'
  }

  constructor(private _http: HttpClient) { }

  getChildInfo(id: number) {
    return this._http.get<Child>(this.baseUrl + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
