import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from '../models/Classroom';
import { Registration } from '../models/Registration';
import { ClassesService } from '../services/classroom.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  public classroom: Classroom;
  public classId: number;
  public registrations: Registration[];
  public classEmail: string = "";
  public status;
  public days;
  public loading: boolean;

  constructor(private _classroomService: ClassesService, private _route: ActivatedRoute,
    private _registrationService: RegistrationService) {
      this.status = this._registrationService.status;
      this.days = this._classroomService.days;
     }

  ngOnInit(): void {
    this.loading = false;
    this._route.params.subscribe(params => {
      this.classId = params['classId'];

      this._classroomService.getClass(this.classId).subscribe(
        data => {
          this.classroom = data;
          this.registrations = this.classroom.registrationList.filter
          (registration => registration.active && registration.status == this.status.registered);

          for (let registration of this.registrations) {
            this.classEmail += registration.child.account.email + ';';
          }
        },
        error => console.log(error.error.message)
      );

    });
  }

}
