import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Child } from '../models/Child';
import { Classroom } from '../models/Classroom';
import { AuthenticationService } from '../services/authentication.service';
import { ClassesService } from '../services/classroom.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.css']
})
export class RegisterChildComponent implements OnInit {
  public childList: Child[];
  public selectedChildId: number;
  public childForm: FormGroup;
  public showAddChildForm: boolean;
  public currentPage = 1;

  public classrooms: Classroom[];
  public classForm: FormGroup;
  public classroom: Classroom;
  public days;

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService,
    private _classroomService: ClassesService) { 
      this.days = this._classroomService.days;
    }

  ngOnInit(): void {
    this.showAddChildForm = false;
    this.currentPage = 1;
    
    this.childForm = this._formBuilder.group({
      childId : ['', Validators.required]
    });

    this.classForm = this._formBuilder.group({
      classId : ['', Validators.required]
    });

    this._authenticationService.populateAccountInfo().then((value) => {
      this.childList = this._authenticationService.currentUser.childList;
    });
  }

  updatedHandler(event) {
    this.ngOnInit();
  }

  selectChild() {
    if (this.childForm.get('childId').value == 'new') {
      this.showAddChildForm = true;
      this.selectedChildId = null;
    } else {
      this.showAddChildForm = false;
      this.selectedChildId = this.childForm.get('childId').value;

      this._classroomService.getClassroomForChild(this.selectedChildId).subscribe(
        data => this.classrooms = data,
        error => console.log(error)
      )
    }
  }

  selectClass() {
    this.classroom = this.classrooms[this.classForm.get('classId').value];
  }

  next() {
    this.currentPage += 1;
  }

  previous() {
    this.currentPage -= 1;
  }

}
