import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  classroom: Classroom;
  classId: number;
  registrations: Registration[];
  classEmail: string = "";
  status;
  days;
  loading: boolean;

  selectedChildId: number;

  classes: Classroom[];

  constructor(private _classroomService: ClassesService, private _route: ActivatedRoute,
    private _registrationService: RegistrationService, private _router: Router) {
      this.status = this._registrationService.status;
     }

  ngOnInit(): void {
    this.loading = false;

    this._classroomService.getClassrooms().subscribe(
      data => this.classes = data,
      error => this._router.navigateByUrl('/error')
    );

    this._route.params.subscribe(params => {
      this.classId = params['classId'];

      if (this.classId) {
        this.getClassInfo();
      }
    });
  }

  getClassInfo() {
    this._classroomService.getClass(this.classId).subscribe(
      data => {
        this.classroom = data;
        this.registrations = this.classroom.registrationList.filter
        (registration => registration.active && registration.status == this.status.registered);

        for (let registration of this.registrations) {
          this.classEmail += registration.child.account.email + ';';
        }
      },
      error => this._router.navigateByUrl('/error')
    );
  }

  selectClass() {
    let selectElement: any = document.getElementById('class');
    this.classId = selectElement.options[selectElement.selectedIndex].value
    
    this.getClassInfo();
  }

  selectChild(index) {
    this.selectedChildId = this.registrations[index].child.id;
  }

}
