import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Classroom } from '../models/Classroom';
import { PaymentDetails } from '../models/PaymentDetails';
import { ClassesService } from '../services/classroom.service';
import { PaymentsService } from '../services/payments.service';
import { ReportService } from '../services/report.service';
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public loading: boolean;
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
  public classrooms: Classroom[];

  constructor(private _paymentService: PaymentsService, private _formBuilder: FormBuilder,
    private _classroomService: ClassesService, private _reportService: ReportService) {
    this.status = this._paymentService.status;
  }

  ngOnInit(): void {
    this.loading = false;
    this.selectedId = null;
    this.pageForm = this._formBuilder.group({
      numOfPayments: [this.numOfPayments],
      sort: [''],
      search: [''],
      class: [0],
      month: [0],
      year: ['']
    });

    this._classroomService.getClassList().subscribe(
      data => this.classrooms = data);

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
    this.selectedId = null;
    this.loading = true;
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

        this.loading = false;

      });
  }

  getPDFReport() {
    let year = this.pageForm.get('year').value ? this.pageForm.get('year').value : 0;

    let cp = new CurrencyPipe('en-US', 'CAD');
    let params = new HttpParams()
      .set('page', 0)
      .set('pageSize', this.totalPayments)
      .set('sort', this.pageForm.get('sort').value)
      .set('search', this.pageForm.get('search').value)
      .set('classId', this.pageForm.get('class').value)
      .set('month', this.pageForm.get('month').value)
      .set('year', year);

    this._paymentService.getPayments(params).subscribe(
      data => {
        let head = [['Name', 'Description', 'Date Paid', 'Total', 'Service Fee', 'Invoice #', 'Payee', 'Payer']];
        let body = [];

        let content: PaymentDetails[] = data.content;
        for (var i = 0; i < data.totalElements; i++) {
          body[i] = [content[i].registration.child.firstName + ' ' + content[i].registration.child.lastName, content[i].description,
                    content[i].datePaid, cp.transform(content[i].total, 'CAD', 'symbol-narrow', '1.2-2'), 
                    cp.transform(content[i].serviceFees, 'CAD', 'symbol-narrow', '1.2-2'), 
                    content[i].invoiceId, content[i].payee, content[i].payer];
        }

        this._reportService.createPDFReport('Payments', head, body);
      });
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
