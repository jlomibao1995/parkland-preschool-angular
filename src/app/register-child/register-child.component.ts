import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disciplineSignatureValidator, outdoorSignatureValidator, safetySignatureValidator, sickSignatureValidator } from '../helpers/signature.validator';
import { Child } from '../models/Child';
import { Classroom } from '../models/Classroom';
import { Registration } from '../models/Registration';
import { AuthenticationService } from '../services/authentication.service';
import { ChildService } from '../services/child.service';
import { ClassesService } from '../services/classroom.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.css']
})
export class RegisterChildComponent implements OnInit {
  public loading: boolean;
  public message: String;
  public success: boolean;

  public childList: Child[];
  public selectedChildId: number;
  public childForm: FormGroup;
  public showAddChildForm: boolean;
  public currentPage = 1;

  public classrooms: Classroom[];
  public classForm: FormGroup;
  public classroom: Classroom;
  public numOfChildContacts;

  public registration: Registration;
  public status;
  public infoComplete = false;

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService,
    private _childService: ChildService, private _classroomService: ClassesService, 
    private _registrationService: RegistrationService) { 
      this.status = this._registrationService.status;
    }

  ngOnInit(): void {
    this.showAddChildForm = false;
    this.currentPage = 1;

    this.message = null;
    this.success = null;
    this.loading = false;

    this.childForm = this._formBuilder.group({
      childId: ['', Validators.required]
    });

    this.classForm = this._formBuilder.group({
      classId: ['', Validators.required]
    });

    this.loading = true;
    this._authenticationService.populateAccountInfo().then((value) => {
      this.childList = this._authenticationService.currentUser.childList;
      this.loading = false;
    });
  }

  updatedHandler(event) {
    this.ngOnInit();
  }

  selectChild() {
    this.classForm = this._formBuilder.group({
      classId: ['', Validators.required]
    });
    
    if (this.childForm.get('childId').value == 'new') {
      this.showAddChildForm = true;
      this.selectedChildId = null;
    } else {
      this.showAddChildForm = false;
      this.selectedChildId = this.childForm.get('childId').value;

      this.loading = true;
      this._classroomService.getClassroomForChild(this.selectedChildId).subscribe(
        data => {
          this.classrooms = data;
          this.loading = false;
        });

      this.loading = true;
      this._childService.getChildInfo(this.selectedChildId).subscribe(
        data => {
          this.numOfChildContacts = data.childContactsList.length;
          this.loading = false;
        });
    }
  }

  selectClass() {
    this.classroom = this.classrooms[this.classForm.get('classId').value];
  }

  register() {
    this.loading = true;
    let registration = {
      child: { id: this.selectedChildId },
      classroom: { id: this.classroom.id }
    }
    this._registrationService.registerChild(registration).subscribe(
      data => {
        this.registration = data;
        this.message = "Child registration details saved";
        this.success = true;
        this.loading = false;
      }, error => {
        this.message = error;
        this.success = false
        this.loading = false;
      }
    )
  }

  next() {
    this.currentPage += 1;
  }

  previous() {
    this.currentPage -= 1;
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }
}
