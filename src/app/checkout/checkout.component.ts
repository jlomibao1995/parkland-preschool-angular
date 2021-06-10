import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDetails } from '../models/PaymentDetails';
import { PaymentsService } from '../services/payments.service';
declare var paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  success: boolean;
  loading: boolean;
  message: string;
  paidFor = false;
  paymentDescription: String;
  subtotal: number;
  serviceFees: number;
  paymentId: number;
  invoiceId: String;
  total: number;
  status;
  updated = false;

  constructor(private _route: ActivatedRoute, private _paymentService: PaymentsService,
    private _router: Router) {
    this._paymentService.status;
  }

  ngOnInit(): void {
    this.getPaymentDetails();

    paypal.Buttons({
      locale : 'en_US',
      style : {
        color : 'blue',
        shape : 'rect',
        label : 'pay',
        tagline : true,
        layout : 'horizontal'
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.paymentDescription,
              amount: {
                currency_code: 'CAD',
                value: this.total,
                breakdown: {
                  item_total: {
                    value: this.subtotal,
                    currency_code: 'CAD'
                  },
                  handling: {
                    value: this.serviceFees,
                    currency_code: 'CAD'
                  }
                }
              },
              invoice_id: this.invoiceId
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.loading = true;

        //send to backend
        let date:string = order.update_time;
        date = date.replace('Z', '');
        date = date.replace('T', ' ');
        const params = new HttpParams()
        .set('payee', order.purchase_units[0].payee.email_address)
        .set('payer', order.payer.email_address + ', ' + order.payer.name.given_name + ' ' + order.payer.name.surname)
        .set('paymentMethod', 'PayPal')
        .set('datePaid', date)
        .set('status', order.status);

        this.paidFor = true;

        this._paymentService.processPaypalPayment(this.invoiceId, params).subscribe(
          data => {
            this.success = true;
            this.message = "Payment has been processed"
            this.loading = false;
            this.updated = true;
          }, error => console.log(error)
        );
      },
      onError: err => this._router.navigateByUrl('/error')

    })
      .render(this.paypalElement.nativeElement);
  }

  getPaymentDetails() {
    this._route.params.subscribe(params => {
      this.invoiceId = params['invoiceId'];

      if (this.invoiceId) {
        this._paymentService.getPaymentForPayPal(this.invoiceId).subscribe(
          data => {
            this.paymentDescription = data.description;
            this.total = data.total;
            this.subtotal = data.subTotal;
            this.serviceFees = data.serviceFees;
            this.paymentId = data.id;
          });
      }
    })
  }

}
