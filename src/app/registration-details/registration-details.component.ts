import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from '../models/Registration';
import { ClassesService } from '../services/classroom.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit, OnChanges {
  @Input() registrationId: number;
  @Input() updated: boolean;
  public registration: Registration;
  public days;
  public status;

  constructor(private _registrationService: RegistrationService, private _classroomService: ClassesService,
    private _router: Router) {
    this.status = this._registrationService.status;
   }

  ngOnChanges(changes: SimpleChanges): void {
    this._registrationService.getRegistration(this.registrationId).subscribe(
      data => this.registration = data,
      error => this._router.navigateByUrl('/error')
    )
  }

  ngOnInit(): void {
  }

}
