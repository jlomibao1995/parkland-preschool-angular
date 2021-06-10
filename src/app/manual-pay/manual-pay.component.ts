import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentDetails } from '../models/PaymentDetails';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-manual-pay',
  templateUrl: './manual-pay.component.html',
  styleUrls: ['./manual-pay.component.css']
})
export class ManualPayComponent implements OnInit, OnChanges {
  public message: String;
  public success: boolean;
  @Input() paymentId: number;
  public paymentDetails: PaymentDetails;
  public status;
  public paymentForm: FormGroup;
  public loading: boolean;
  updated: boolean;

  constructor(private _paymentService: PaymentsService, private _formBuilder: FormBuilder) {
    this.status = this._paymentService.status;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._paymentService.getPayment(this.paymentId).subscribe(
      data => this.paymentDetails = data);
  }

  ngOnInit(): void {

    this.paymentForm = this._formBuilder.group({
      payee : ['Admin', Validators.required],
      payer : ['Parent', Validators.required],
      method : ['Cash', Validators.required],
      serviceFee : [0, Validators.required]
    });

    if (this.paymentId) {
      this._paymentService.getPayment(this.paymentId).subscribe(
        data => this.paymentDetails = data);
    }

    this.loading = false;
  }

  get payee(){
    return this.paymentForm.get('payee');
  }

  get payer(){
    return this.paymentForm.get('payer');
  }

  get method(){
    return this.paymentForm.get('method');
  }

  get serviceFee() {
    return this.paymentForm.get('serviceFee');
  }

  processPayment() {
    this.loading = true;
    let date = new Date();
    let datePaipe = new DatePipe('en-CA');
    let formattedDate: string = datePaipe.transform(date, 'yyyy-MM-dd HH:mm:ss');

    const params = new HttpParams()
    .set('payee', this.payee.value)
    .set('payer', this.payer.value)
    .set('paymentMethod', this.method.value)
    .set('datePaid', formattedDate)
    .set('serviceFee', this.serviceFee.value);

    this._paymentService.processPayment(this.paymentDetails.invoiceId, params).subscribe(
      data => this.successMessage('Payment changes have been processed', data),
      error => this.errorMessage(error)
    );
  }

  successMessage(successMesage: String, data) {
    this.message = successMesage;
    this.success = true;
    this.updated = true;
    this.loading = false;
    this.paymentDetails = data;
  }

  errorMessage(error: HttpErrorResponse) {
    this.ngOnInit();
    this.message = error.error.message;
    this.success = false;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
