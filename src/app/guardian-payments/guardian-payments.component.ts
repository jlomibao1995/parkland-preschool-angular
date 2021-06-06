import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentDetails } from '../models/PaymentDetails';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-guardian-payments',
  templateUrl: './guardian-payments.component.html',
  styleUrls: ['./guardian-payments.component.css']
})
export class GuardianPaymentsComponent implements OnInit {
  public loading:boolean;
  public message: String;
  public success: boolean;
  public status;
  public payments: PaymentDetails[];
  private selectedPayment: PaymentDetails;
  public selectedId: number;

  public pages: number[] = [];
  public totalPages: number;
  public currentPage = 1;
  public numOfPayments = 10;
  public totalPayments: number;

  public pageForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _paymentService: PaymentsService) {
    this.status = this._paymentService.status;
   }

  ngOnInit(): void {
    this.loading = false;
    this.message = null;
    this.success = null;
    this.selectedId = null;
    this.pageForm = this._formBuilder.group({
      numOfPayments: [this.numOfPayments],
      month: [0],
      year: ['']
    });

    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.selectedId = null;
    this.loading = true;
    this.pages = [];
    this.currentPage = page;
    let year = this.pageForm.get('year').value ? this.pageForm.get('year').value : 0;

    let params = new HttpParams()
      .set('page', this.currentPage - 1)
      .set('pageSize', this.numOfPayments)
      .set('month', this.pageForm.get('month').value)
      .set('year', year);

    this._paymentService.getPaymentsForAccount(params).subscribe(
      data => {
        this.payments = data.content;
        this.totalPages = data.totalPages;
        this.totalPayments = data.totalElements;

        let start = this.currentPage - 2;

        if (this.currentPage + 2 > this.totalPages) {
          start = this.currentPage - 3;
        }

        if (start <= 0) {
          start = 1;
        }

        for (let i = 0; i < 5; i++) {
          if (this.totalPayments == 0) {
            break;
          }

          this.pages[i] = start + i;

          if (start + i == this.totalPages) {
            break;
          }
        }

        this.loading = false;

      }, error => console.log(error)
    );
  }

  changePaymentNum() {
    this.numOfPayments = this.pageForm.get('numOfPayments').value;
    this.goToPage(1);
  }

  selectPayment(index) {
    this.selectedPayment = this.payments[index];
    this.selectedId = this.selectedPayment.id;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
