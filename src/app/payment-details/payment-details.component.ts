import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaymentDetails } from '../models/PaymentDetails';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnChanges {

  @Input() public paymentId: number;
  @Input() updated: boolean;
  public payment: PaymentDetails;
  public status;

  constructor(private _paymentService: PaymentsService) {
    this.status = this._paymentService.status;
   }
   
  ngOnChanges(changes: SimpleChanges): void {
    this._paymentService.getPayment(this.paymentId).subscribe(
      data => this.payment = data,
      error => console.log(error.error.message))
  }

  ngOnInit(): void {
    
  }

}
