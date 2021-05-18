import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classroom } from '../models/Classroom';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit, OnChanges {
  editForm: FormGroup;
  editMode = false;
  @Input() class: Classroom;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.editMode = false;
    if (changes.class) {
      //format time to display it correctly
      let space = this.class.startDate.indexOf(' ');
      let sDate = this.class.startDate.substr(0, space);
      let sTime = this.class.startDate.substr(space+1);

      space = this.class.endDate.indexOf(' ');
      let eDate = this.class.endDate.substr(0, space);
      let eTime = this.class.endDate.substr(space+1);

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
    }
  }

  ngOnInit(): void {
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

  goToEditMode() {
    this.editMode = true
  }

  cancelEdit() {
    this.editMode = false;
  }

}
