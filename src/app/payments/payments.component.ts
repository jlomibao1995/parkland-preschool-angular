import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentDetails } from '../models/PaymentDetails';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
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
  public columnStates = {
    name: true,
    invoiceId: false,
    payee: false,
    payer: false,
    paymentStatus: true,
    total: true,
    datePaid: false,
    description: true,
    paymentMethod: false,
    actions: true
  };

  constructor(private _paymentService: PaymentsService, private _formBuilder: FormBuilder) {
    this.status = this._paymentService.status;
   }

  ngOnInit(): void {
    this.message = null;
    this.success = null;
    this.selectedId = null;
    this.pageForm = this._formBuilder.group({
      numOfPayments: [this.numOfPayments],
      sort: [''],
      search: [''],
      class: [0],
      month: [''],
      year: ['']
    });

    this.goToPage(this.currentPage);
  }

  selectPayment(index) {
    this.selectedPayment = this.payments[index];
    this.selectedId = this.selectedPayment.id;
  }

  changePaymentNum() {
    this.numOfPayments = this.pageForm.get('numOfPayments').value;
    this.goToPage(1);
  }

  goToPage(page: number) {
    this.pages = [];
    this.currentPage = page;
    let year = this.pageForm.get('year').value ? this.pageForm.get('year').value : 0;

    let params = new HttpParams()
      .set('page', this.currentPage - 1)
      .set('pageSize', this.numOfPayments)
      .set('sort', this.pageForm.get('sort').value)
      .set('search', this.pageForm.get('search').value)
      .set('classId', this.pageForm.get('class').value)
      .set('month', this.pageForm.get('month').value)
      .set('year', year);

    this._paymentService.getPayments(params).subscribe(
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

      }, error => console.log(error.error.message)
    );
  }

  messageChangedHandler(event) {

  }

  successMessage(successMesage: String) {
    this.goToPage(this.currentPage);
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error: HttpErrorResponse) {
    this.goToPage(this.currentPage);
    this.message = error.error.message;
    this.success = false;
  }

  toggleColumnState(event) {
    let checked = false;
    if (event.target.checked) {
      checked = true;
    }

    switch (event.srcElement.name) {
      case 'name':
        this.columnStates.name = checked;
        break;
      case 'description':
        this.columnStates.description = checked;
        break;
      case 'invoice':
        this.columnStates.invoiceId = checked;
        break;
      case 'datePaid':
        this.columnStates.datePaid = checked;
        break;
      case 'payee':
        this.columnStates.payee = checked;
        break;
      case 'payer':
        this.columnStates.payer = checked;
        break;
      case 'method':
        this.columnStates.paymentMethod = checked;
        break;
      case 'status':
        this.columnStates.paymentStatus = checked;
        break;
      case 'total':
        this.columnStates.total = checked;
        break;
      case 'actions':
        this.columnStates.actions = checked;
    }
  }

}
