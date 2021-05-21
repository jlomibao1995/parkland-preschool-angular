import { Component, OnInit } from '@angular/core';
import { Registration } from '../models/Registration';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  public message: String;
  public selectedId: number;
  public selectedRegistration: Registration;

  public pages: number[] = [];
  public registrations: Registration[];
  public totalPages: number;
  public currentPage = 1;
  public numOfRegistrations = 10;
  public totalRegistrations: number;

  constructor(private _registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.goToPage(this.currentPage)
  }

  goToPage(page) {
    this.pages = [];
    this.currentPage = page;
    this._registrationService.getRegistrations(this.currentPage, this.numOfRegistrations).subscribe(
      data => {
        this.registrations = data.content;
        this.totalPages = data.totalPages;
        
        //figure out which page buttons are visible
        let start = this.currentPage - 2;
        if (start <= 0) {
          start = 1;
        }

        for (let i = 0; i < 5; i++) {
          this.pages[i] = start + i;

          if (start + i == this.totalPages) {
            break;
          }
        }

        this.totalRegistrations = data.totalElements;
      },
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  selectRegistration(id) {
    this.selectedId = id;
    this._registrationService.getRegistration(id).subscribe(data => this.selectedRegistration = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

}
