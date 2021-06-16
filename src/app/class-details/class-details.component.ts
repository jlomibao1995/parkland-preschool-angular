import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classroom } from '../models/Classroom';
import { ClassesService } from '../services/classroom.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit, OnChanges {
  editForm: FormGroup;
  editMode = false;
  public class: Classroom;
  @Input() public classId;
  public message: String;
  public success: boolean;
  public day;
  public loading: boolean;

  constructor(private _formBuilder: FormBuilder, private _classService: ClassesService) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
    this.getClass();

  }

  ngOnInit(): void {
    this.editMode = false;
    this.message = null;
    this.success = null;
    this.loading = false;
    this.editForm = this._formBuilder.group({
      description: ['', Validators.required],
      age: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      endDate: ['', Validators.required],
      days: ['', Validators.required],
      capacity: ['', Validators.required],
      cost: ['', Validators.required]
    });
  }

  getClass() {
    this.loading = true;
    this._classService.getClass(this.classId).subscribe(
      data => {
        this.class = data;

        //format time to display it correctly
        let space = this.class.startDate.indexOf(' ');
        let sDate = this.class.startDate.substr(0, space);
        let sTime = this.class.startDate.substr(space + 1);

        space = this.class.endDate.indexOf(' ');
        let eDate = this.class.endDate.substr(0, space);
        let eTime = this.class.endDate.substr(space + 1);

        this.editForm = this._formBuilder.group({
          description: [this.class.description, Validators.required],
          age: [this.class.ageGroup, Validators.required],
          startDate: [sDate, Validators.required],
          startTime: [sTime, Validators.required],
          endTime: [eTime, Validators.required],
          endDate: [eDate, Validators.required],
          days: [this.class.days, Validators.required],
          capacity: [this.class.capacity, Validators.required],
          cost: [this.class.costPerMonth, Validators.required]
        });

        this.loading = false;

      });
  }

  get description() {
    return this.editForm.get('description');
  }

  get age() {
    return this.editForm.get('age');
  }

  get startDate() {
    return this.editForm.get('startDate');
  }

  get startTime() {
    return this.editForm.get('startTime');
  }

  get endDate() {
    return this.editForm.get('endDate');
  }

  get endTime() {
    return this.editForm.get('endTime');
  }

  get days() {
    return this.editForm.get('days');
  }

  get capacity() {
    return this.editForm.get('capacity');
  }

  get cost() {
    return this.editForm.get('cost');
  }

  edit(){
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  updateClassroom() {
    this.loading = true;
    let sDate = this.startDate.value + ' ' + this.startTime.value;
    let eDate = this.endDate.value + ' ' + this.endTime.value
    console.log(sDate);
    console.log(eDate);

    const params = new HttpParams()
    .set('capacity', this.capacity.value)
    .set('ageGroup', this.age.value)
    .set('startDate', sDate)
    .set('endDate', eDate)
    .set('days', this.days.value)
    .set('costPerMonth', this.cost.value)
    .set('description', this.description.value);

    this._classService.updateClassroom(this.classId, params).subscribe(
      data => this.successMessage('Class changes have been saved'),
      error => this.errorMessage(error)
    )
  }

  successMessage(successMesage: String) {
    this.ngOnInit();
    this.getClass();
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error: HttpErrorResponse) {
    this.message = error.error.message;
    this.success = false;
    this.loading = false;
    this.getClass();
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
