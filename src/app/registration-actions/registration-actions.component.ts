import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDetails } from '../models/PaymentDetails';
import { Registration } from '../models/Registration';
import { PaymentsService } from '../services/payments.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration-actions',
  templateUrl: './registration-actions.component.html',
  styleUrls: ['./registration-actions.component.css']
})
export class RegistrationActionsComponent implements OnInit, OnChanges {
  @Input() registrationId: number;

  message: string;
  success: boolean;
  loading: boolean;

  registration: Registration;
  status;
  paymentStatus;
  paymentList: PaymentDetails[];

  childId: number;

  @Output() updated: EventEmitter<String> = new EventEmitter();

  constructor(private _registrationService: RegistrationService, private _paymentService: PaymentsService,
    private _router: Router) {
    this.status = this._registrationService.status;
    this.paymentStatus = this._paymentService.status;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._registrationService.getRegistration(this.registrationId).subscribe(
      data => {
        this.registration = data;
      },
      error => this._router.navigateByUrl('/error')
    );

    this._paymentService.getPaymentsForRegistration(this.registrationId).subscribe(
      data => {
        this.paymentList = data.content;
      }, error => this._router.navigateByUrl('/error')
    );

  }

  selectChild(childId) {
    this.childId = childId;
  }

  ngOnInit(): void {
    if (this.registrationId) {
      this._registrationService.getRegistration(this.registrationId).subscribe(
        data => {
          this.registration = data;
        },
        error => this._router.navigateByUrl('/error')
      );

      this._paymentService.getPaymentsForRegistration(this.registrationId).subscribe(
        data => {
          this.paymentList = data.content;
        }, error => this._router.navigateByUrl('/error')
      );

    }
  }

  waitList() {
    this.loading = true;
    let params = new HttpParams().set('status', this.status.waitlisted);
    this._registrationService.updateRegistration(this.registration.id, params).subscribe(
      data => {
        this.ngOnInit();
        this.updated.emit('updated');
      },
      error => this._router.navigateByUrl('/error'));
  }

}
