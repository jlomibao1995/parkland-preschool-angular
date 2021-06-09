import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { paymentDescriptionValidator } from '../helpers/payment.description.validator';
import { Classroom } from '../models/Classroom';
import { Registration } from '../models/Registration';
import { ClassesService } from '../services/classroom.service';
import { PaymentsService } from '../services/payments.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  public addForm: FormGroup;
  public registrations: Registration[];
  public classrooms: Classroom[];
  public selectedClassroom: Classroom;
  public message: String;
  public success: boolean;
  public loading: boolean;

  visibleInputs = 1;

  constructor(private _formBuilder: FormBuilder, private _paymentService: PaymentsService, private _registrationService: RegistrationService,
    private _classroomService: ClassesService, private _router: Router) { }

  ngOnInit(): void {
    this.visibleInputs = 1;
    this.loading = false;
    this.addForm = this._formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      month: ['', Validators.required],
      cost: ['', Validators.required],
      serviceFees: ['', Validators.required],
      class: ['', Validators.required],
      paymentFor: ['', Validators.required]
    }, { validators: [paymentDescriptionValidator] });

    this._classroomService.getClassList().subscribe(
      data => {
        this.classrooms = data;
        this.loading = false;
      },
      error => this._router.navigateByUrl('/error')
    );

    this.loading = true;
  }

  get type() {
    return this.addForm.get('type');
  }

  get description() {
    return this.addForm.get('description');
  }

  get month() {
    return this.addForm.get('month');
  }

  get cost() {
    return this.addForm.get('cost');
  }

  get serviceFees() {
    return this.addForm.get('serviceFees');
  }

  get class() {
    return this.addForm.get('class');
  }

  get paymentFor() {
    return this.addForm.get('paymentFor');
  }

  toggleClassSelection() {
    let index = this.class.value;
    this.selectedClassroom = this.classrooms[index];
    this.registrations = this.selectedClassroom.registrationList;
    this.registrations = this.registrations.filter(registration => registration.active && registration.status == this._registrationService.status.registered);

    this.visibleInputs = 7;
    switch (this.type.value) {
      case 'month':
        this.addForm.patchValue({
          cost: this.selectedClassroom.costPerMonth
        });
        break;
      case 'full':
        this.addForm.patchValue({
          cost: ''
        });
        break;
      case 'misc':
        this.addForm.patchValue({
          cost: ''
        });
    }
  }

  addPayment() {
    if (this.type.value == 'month') {
      const params = new HttpParams()
        .set('classId', this.selectedClassroom.id)
        .set('serviceFee', this.serviceFees.value);

      this._paymentService.createMonthlyPayment(params).subscribe(
        data => this.successMessage("Payment entry has been added to " + data + " registration(s)"),
        error => this.errorMessage(error)
      )
    } else {
      let paymentDetails = {
        description: this.description.value,
        paymentMonth: this.month.value,
        subTotal: this.cost.value,
        serviceFees: this.serviceFees.value,
        registration: {}
      }

      let recipient = this.paymentFor.value;

      if (recipient == 'all') {
        this._paymentService.addPaymentForClass(this.selectedClassroom.id, paymentDetails).subscribe(
          data => this.successMessage("Payment entry has been added to " + data + " registration(s)"),
          error => this.errorMessage(error)
        );
      } else {
        paymentDetails.registration = { id: this.paymentFor.value }

        if (this.type.value == 'full') {
          this._paymentService.createFullPayment(paymentDetails).subscribe(
            data => this.successMessage("Payment entry has been added "),
          error => this.errorMessage(error)
          );

        } else {
          this._paymentService.addPayment(paymentDetails).subscribe(
            data => this.successMessage("Payment entry has been added"),
            error => {
              this.errorMessage(error);
              console.log(error);
            }
          );
        }
      }
    }

    this.loading = true;
  }

  successMessage(message: string) {
    this.ngOnInit();
    this.success = true;
    this.message = message;
  }

  errorMessage(error) {
    this.message = error;
    this.success = false;
    this.loading = false;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

  toggleInputs() {
    switch (this.type.value) {
      case 'month':
        this.addForm.patchValue({
          month: new Date().getMonth() + 1,
          description: 'Monthly Fee',
          paymentFor: 'all'
        });
        this.visibleInputs = 5;
        break;
      case 'full':
        this.addForm.patchValue({
          month: new Date().getMonth() + 1,
          description: 'Full Tuition Payment'
        });
        this.visibleInputs = 5;
        break;
      case 'misc':
        this.addForm.patchValue({
          month: '',
          description: ''
        });
        this.visibleInputs = 3;
    }
  }

  togglePaymentFor() {
    this.visibleInputs = 5;
  }
  
  toggleCost() {
    this.visibleInputs = 7;
  }
}
