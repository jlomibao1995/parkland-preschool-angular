import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Registration } from '../models/Registration';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration-actions',
  templateUrl: './registration-actions.component.html',
  styleUrls: ['./registration-actions.component.css']
})
export class RegistrationActionsComponent implements OnInit, OnChanges {
  @Input() registrationId: number;
  registration: Registration;
  status;

  constructor(private _registrationService: RegistrationService) {
    this.status = this._registrationService.status;
   }

  ngOnChanges(changes: SimpleChanges): void {
    this._registrationService.getRegistration(this.registrationId).subscribe(
      data => this.registration = data,
      error => console.log(error)
    );

    
  }

  ngOnInit(): void {
  }

}
