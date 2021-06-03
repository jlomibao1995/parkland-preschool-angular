import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Classroom } from '../models/Classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  public baseUrl = environment.baseUrl + '/classroom';
  private headers = { 'content-type': 'application/json' };
  public days = {
    mwf : 'MWF',
    tth : 'TTh'
  }

  constructor(private _http: HttpClient) { }

  getClassList() {
    return this._http.get<any>(this.baseUrl + '/classrooms')
    .pipe(catchError(this.errorHandler));
  }

  getClasses(page, pageSize) {
    page = page -1;
    let url = this.baseUrl + '/admin/classrooms/pages?page=' + page + '&pageSize=' + pageSize;
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  getClass(classId) {
    let url = this.baseUrl + '/' + classId;
    return this._http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  addClassroom(classroom: Classroom) {
    return this._http.post<any>(this.baseUrl + '/admin', classroom, {'headers': this.headers})
    .pipe(catchError(this.errorHandler));
  }

  updateClassroom(id, params: HttpParams){
    return this._http.put<any>(this.baseUrl + '/admin/' + id, {}, {params})
    .pipe(catchError(this.errorHandler));
  }

  deleteClassroom(id) {
    return this._http.delete(this.baseUrl + '/admin/' + id)
    .pipe(catchError(this.errorHandler));
  }

  getClassroomForChild(childId) {
    return this._http.get<Classroom[]>(this.baseUrl + '/classrooms_child/' + childId)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
