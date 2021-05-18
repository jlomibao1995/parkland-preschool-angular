import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  addForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      description:['', Validators.required],
      age:['', Validators.required],
      startDate:['', Validators.required],
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      endDate:['', Validators.required],
      days:['', Validators.required],
      capacity:['', Validators.required],
      cost:['', Validators.required]
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

}
