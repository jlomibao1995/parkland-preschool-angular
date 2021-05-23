import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public registrations: Registration[];
  public classrooms: Classroom[];
  public selectedId: number;
  public selectedRegistration: Registration;

  public pages: number[] = [];
  public totalPages: number;
  public currentPage = 1;
  public numOfRegistrations = 10;
  public totalRegistrations: number;

  public pageForm: FormGroup;

  public status = {
    registered : 'REGISTERED',
    waitlisted: 'WAIT_LISTED',
    pending: 'PENDING',
    unregistered: 'UNREGISTERED'
  };

  constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder,
    private _classroomService: ClassesService) { }

  ngOnInit(): void {
    this.message = null;
    this.success = null;
    this.pageForm = this._formBuilder.group({
      numOfRegistrations: [10],
      search: [''],
      classroom: [0],
      status: ['']
    });

    this._classroomService.getClassList().subscribe(data => this.classrooms = data,
      error => this.errorMessage(error));

    this.goToPage(this.currentPage)
  }

  changeRegistrationsNum() {
    this.numOfRegistrations = this.pageForm.get('numOfRegistrations').value;
    this.goToPage(1);
  }

  goToPage(page) {
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

      },
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  selectRegistration(index) {
    this.selectedRegistration = this.registrations[index];
    this.selectedId = this.selectedRegistration.id;
  }

  reload() {
    this.ngOnInit();
  }

  activateRegistration(registrationId) {
    let params = new HttpParams()
    .set('active', true);

    this._registrationService.updateRegistration(registrationId, params).subscribe(
      data => this.successMessage("Registration activated"),
      error => this.errorMessage(error)
    );
  }

  deactivateRegistration(registrationId) {
    let params = new HttpParams()
    .set('active', false);

    this._registrationService.updateRegistration(registrationId, params).subscribe(
      data => this.successMessage("Registration deactivated"),
      error => this.errorMessage(error)
    );
  }

  successMessage(successMesage: String) {
    this.reload();
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error: HttpErrorResponse) {
    this.reload();
    this.message = error.error.message;
    this.success = false;
  }

}
