import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaymentDetails } from '../models/PaymentDetails';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private baseUrl = environment.baseUrl + '/payment'
  private headers = { 'content-type': 'application/json' };
  public status = {
    unpaid : 'UNPAID',
    paid : 'PAID'
  }

  constructor(private _http: HttpClient) { }

  getPayments(params: HttpParams) {
    return this._http.get<any>(this.baseUrl + '/payments/pages', {params})
    .pipe(catchError(this.errorHandler));
  }

  addPayment(payment: any) {
    return this._http.post<any>(this.baseUrl, payment, {'headers': this.headers})
    .pipe(catchError(this.errorHandler));
  }

  addPaymentForClass(classId: number, payment: any) {
    return this._http.post<any>(this.baseUrl + '/class_payments/' + classId, payment, {'headers': this.headers})
    .pipe(catchError(this.errorHandler));
  }

  processPayment(invoiceId: String, params: HttpParams) {
    return this._http.put<any>(this.baseUrl + '/admin/' + invoiceId, {}, {params})
    .pipe(catchError(this.errorHandler));
  }

  getPayment(id){
    return this._http.get<PaymentDetails>(this.baseUrl + "/" + id)
    .pipe(catchError(this.errorHandler));
  }

  getPaymentForPayPal(invoiceId) {
    return this._http.get<PaymentDetails>(this.baseUrl + "/invoice/" + invoiceId)
    .pipe(catchError(this.errorHandler));
  }

  processPaypalPayment(invoiceId, params){
    return this._http.put<any>(this.baseUrl + '/paypal/' + invoiceId, {}, {params})
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
