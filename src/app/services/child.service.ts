import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Child } from '../models/Child';
import { ChildContact } from '../models/ChildContact';

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

  addChild(child) {
    return this._http.post<any>(this.baseUrl, child)
    .pipe(catchError(this.errorHandler)); 
  }

  updateChildInfo(id, params: HttpParams) {
    return this._http.put<any>(this.baseUrl + '/' + id, {}, {params})
    .pipe(catchError(this.errorHandler)); 
  }

  getChildContact(id: number) {
    return this._http.get<ChildContact>(this.baseUrl + '/child_contacts/' + id)
    .pipe(catchError(this.errorHandler));
  }

  updateChildContact(id: number, params: HttpParams){
    return this._http.put<any>(this.baseUrl + '/child_contacts/' + id, {}, {params})
    .pipe(catchError(this.errorHandler));
  }

  addChildContact(contact) {
    return this._http.post<any>(this.baseUrl + '/child_contacts', contact)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
