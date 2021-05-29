import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _formBuilder: FormBuilder, private _paymentService: PaymentsService, private _registrationService: RegistrationService,
    private _classroomService: ClassesService) { }

  ngOnInit(): void {
    this.loading = false;
    this.addForm = this._formBuilder.group({
      description: ['', Validators.required],
      month: ['', Validators.required],
      cost: ['', Validators.required],
      serviceFees: ['', Validators.required],
      class: ['', Validators.required],
      paymentFor: ['', Validators.required]
    });

    this._classroomService.getClassList().subscribe(
      data => {
        this.classrooms = data;
        this.loading = false;
      },
      error => {
        console.log(error.error.message);
        this.loading = false;
      }
    );

    this.loading = true;
  }

  get description(){
    return this.addForm.get('description');
  }

  get month(){
    return this.addForm.get('month');
  }

  get cost(){
    return this.addForm.get('cost');
  }

  get serviceFees(){
    return this.addForm.get('serviceFees');
  }

  get class(){
    return this.addForm.get('class');
  }

  get paymentFor(){
    return this.addForm.get('paymentFor');
  }

  toggleClassSelection(){
    let index = this.class.value;
    this.selectedClassroom = this.classrooms[index];
    this.registrations = this.selectedClassroom.registrationList;
    this.registrations = this.registrations.filter(registration => registration.active && registration.status == this._registrationService.status.registered);
  }

  addPayment(){
    let paymentDetails = {
      description : this.description.value,
      paymentMonth : this.month.value,
      subTotal : this.cost.value,
      serviceFees : this.serviceFees.value,
      registration: {}
    }
    let recipient = this.paymentFor.value;

    if (recipient == 'all') {
      this._paymentService.addPaymentForClass(this.selectedClassroom.id, paymentDetails).subscribe(
        data => {
          this.ngOnInit();
          this.success = true;
          this.message = "Payment entry has been added"
        }, 
        error => {
          this.message = error.error.message;
          this.success = false;
        }
      )
    } else {
      paymentDetails.registration = {id : this.paymentFor.value}

      this._paymentService.addPayment(paymentDetails).subscribe(
        data => {
          this.ngOnInit();
          this.success = true;
          this.message = "Payment entry has been added"
        }, 
        error => {
          this.message = error.error.message;
          this.success = false;
        }
      )
    }
    this.loading = true;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
