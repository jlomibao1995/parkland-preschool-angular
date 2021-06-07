import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../models/Classroom';
import { ClassesService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-info',
  templateUrl: './classroom-info.component.html',
  styleUrls: ['./classroom-info.component.css']
})
export class ClassroomInfoComponent implements OnInit {
  @Input() classroom: Classroom;
  public days;

  constructor(private _classroomService: ClassesService) {
   }

  ngOnInit(): void {
  }

}
