import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../models/Registration';
import { ClassesService } from '../services/classroom.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  public addForm: FormGroup;
  public message: String;
  public success: boolean;
  public day;
  public loading: boolean;

  constructor(private _formBuilder: FormBuilder, public _classService: ClassesService) {
    this.day = this._classService.days;
   }

  ngOnInit(): void {
    this.loading = false;
    this.addForm = this._formBuilder.group({
      description:['', Validators.required],
      age:['', Validators.required],
      startDate:['', Validators.required],
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      endDate:['', Validators.required],
      days:['', Validators.required],
      capacity:['', Validators.required],
      cost:['', Validators.required],
      serviceFee: ['', Validators.required]
    });
  }

  get description() {
    return this.addForm.get('description');
  }

  get age() {
    return this.addForm.get('age');
  }

  get startDate() {
    return this.addForm.get('startDate');
  }

  get startTime() {
    return this.addForm.get('startTime');
  }

  get endDate() {
    return this.addForm.get('endDate');
  }

  get endTime() {
    return this.addForm.get('endTime');
  }

  get days() {
    return this.addForm.get('days');
  }

  get capacity() {
    return this.addForm.get('capacity');
  }

  get cost() {
    return this.addForm.get('cost');
  }

  get serviceFee() {
    return this.addForm.get('serviceFee');
  }

  addClassroom() {
    this.loading = true;
    let sDate = this.startDate.value + ' ' + this.startTime.value;
    let eDate = this.endDate.value + ' ' + this.endTime.value

    this._classService.addClassroom({
      'capacity': this.capacity.value,
      'ageGroup': this.age.value,
      'startDate': sDate,
      'endDate': eDate,
      'days': this.days.value,
      'costPerMonth': this.cost.value,
      'description': this.description.value,
      'openRegistration': false,
      'id': 0,
      'enrolled': 0,
      'picturePass': '',
      'registrationList': [],
      'full': false,
      'serviceFee': this.serviceFee.value
    }).subscribe(
      data => this.successMessage('Class was created'),
      error => this.errorMessage(error)
    )
  }

  successMessage(successMesage: String) {
    this.ngOnInit();
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error) {
    this.message = error;
    this.success = false;
    this.loading = false;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
