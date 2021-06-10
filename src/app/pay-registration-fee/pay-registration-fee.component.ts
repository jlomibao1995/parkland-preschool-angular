import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDetails } from '../models/PaymentDetails';
import { Registration } from '../models/Registration';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-pay-registration-fee',
  templateUrl: './pay-registration-fee.component.html',
  styleUrls: ['./pay-registration-fee.component.css']
})
export class PayRegistrationFeeComponent implements OnInit {
  success: boolean;
  message: string;
  loading: boolean;

  paymentId: String;
  registration: Registration;
  payment: PaymentDetails;
  childId: number;
  infoComplete: boolean;

  currentPage = 1;

  constructor(private _paymentService: PaymentsService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.paymentId = params['id'];

      this._paymentService.getPayment(this.paymentId).subscribe(
        data => {
          this.payment = data;
          this.registration = data.registration;
          this.childId = data.registration.child.id;
        });
    });
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

  next() {
    this.currentPage += 1;
  }

  previous() {
    this.currentPage -= 1;
  }

  cancel() {
    this._router.navigateByUrl('/myaccount');
  }

  payRegistrationFee(){
    this._router.navigate(['/checkout', this.payment.invoiceId]);
  }

}
