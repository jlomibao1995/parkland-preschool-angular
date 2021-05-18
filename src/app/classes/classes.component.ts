import { Component, OnInit } from '@angular/core';
import { Classroom } from '../models/Classroom';
import { ClassesService } from '../services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  public classes: Classroom;
  public message: String;

  constructor(private _classroomService: ClassesService) { }

  ngOnInit(): void {
    this._classroomService.getClasses().subscribe(data => this.classes = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

}
