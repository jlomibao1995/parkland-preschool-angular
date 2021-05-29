import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classroom } from '../models/Classroom';
import { Registration } from '../models/Registration';
import { ClassesService } from '../services/classroom.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  public message: String;
  public success: boolean;
  public loading: boolean;
  public registrations: Registration[];
  public classrooms: Classroom[];
  public selectedId: number;
  public selectedRegistration: Registration;
  public registrationUpdated: boolean;
  public childClassrooms: Classroom[];

  public pages: number[] = [];
  public totalPages: number;
  public currentPage = 1;
  public numOfRegistrations = 10;
  public totalRegistrations: number;

  public pageForm: FormGroup;

  public status;

  public moveForm: FormGroup;

  constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder,
    private _classroomService: ClassesService) {
      this.status = this._registrationService.status;
     }

  ngOnInit(): void {
    this.loading = false;
    this.message = null;
    this.success = null;
    this.pageForm = this._formBuilder.group({
      numOfRegistrations: [this.numOfRegistrations],
      search: [''],
      classroom: [0],
      status: ['']
    });

    this.moveForm = this._formBuilder.group({
      class: ['', Validators.required]
    });

    this._classroomService.getClassList().subscribe(data => this.classrooms = data,
      error => this.errorMessage(error));

    this.goToPage(this.currentPage);
    this.registrationUpdated = false;
  }

  changeRegistrationsNum() {
    this.numOfRegistrations = this.pageForm.get('numOfRegistrations').value;
    this.goToPage(1);
  }

  goToPage(page) {
    this.loading = true;
    this.pages = [];
    this.currentPage = page;
    let searchQuery: String = this.pageForm.get('search').value;
    let classroom: number = this.pageForm.get('classroom').value;
    let status: String = this.pageForm.get('status').value;

    this._registrationService.getRegistrations(this.currentPage, this.numOfRegistrations,
      classroom, status, searchQuery).subscribe(
      data => {
        this.registrations = data.content;
        this.totalPages = data.totalPages;
        this.totalRegistrations = data.totalElements;
        
        //figure out which page buttons are visible
        let start = this.currentPage - 2;

        if(this.currentPage + 2 > this.totalPages) {
          start = this.currentPage - 3;
        }
        
        if (start <= 0) {
          start = 1;
        }

        for (let i = 0; i < 5; i++) {
          if (this.totalRegistrations == 0) {
            break;
          }

          this.pages[i] = start + i;

          if (start + i == this.totalPages) {
            break;
          }
        }

        this.loading = false;

      },
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  selectRegistration(index) {
    this.selectedRegistration = this.registrations[index];
    this.selectedId = this.selectedRegistration.id;
    this.getClassForChild();
  }

  reload() {
    this.ngOnInit();
  }

  activateRegistration(registrationId) {
    this.loading = true;
    let params = new HttpParams()
    .set('active', true);

    this._registrationService.updateRegistration(registrationId, params).subscribe(
      data => this.successMessage("Registration activated"),
      error => this.errorMessage(error)
    );
  }

  deactivateRegistration(registrationId) {
    this.loading = true;
    let params = new HttpParams().set('active', false);

    this._registrationService.updateRegistration(registrationId, params).subscribe(
      data => this.successMessage("Registration deactivated"),
      error => this.errorMessage(error)
    );
  }

  acceptRegistration(registrationId) {
    this.loading = true;
    let params = new HttpParams().set('status', this.status.registered);
    this._registrationService.updateRegistration(registrationId, params).subscribe(
      data => this.successMessage('Registration confirmed and accepted'),
      error => this.errorMessage(error)
    )
  }

  offerSpot(registrationId) {
    this.loading = true;
    let params = new HttpParams().set('status', this.status.unregistered);
    this._registrationService.updateRegistration(registrationId, params).subscribe(
      data => this.successMessage('Spot offered to child: Email sent to account'),
      error => this.errorMessage(error)
    )
  }

  getClassForChild() {
    this._classroomService.getClassroomForChild(this.selectedRegistration.child.id).subscribe(
      data => this.childClassrooms = data,
      error => error.error.message
    );
  }

  moveClass() {
    this.loading = true;
    this.registrationUpdated = false;
    this._registrationService.updateRegistration(this.selectedId, new HttpParams().set('classId', this.moveForm.get('class').value))
    .subscribe(data => {
      this.ngOnInit();
      this.successMessage('Registration was transfered to a different class');
      this.registrationUpdated = true;
      this.getClassForChild();
    }, error => this.errorMessage(error));
  }

  deleteRegistration() {
    this.loading = true;
    this._registrationService.deleteRegistration(this.selectedId).subscribe(
      data => this.successMessage('Registration deleted'),
      error => this.errorMessage(error)
    )
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

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
