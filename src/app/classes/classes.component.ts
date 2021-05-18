import { Component, OnInit } from '@angular/core';
import { Classroom } from '../models/Classroom';
import { ClassesService } from '../services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  public classes: [];
  public selectedClass: Classroom;
  public message: String;
  public selectedIndex: number;

  constructor(private _classroomService: ClassesService) { }

  ngOnInit(): void {
    this._classroomService.getClasses().subscribe(data => this.classes = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      });
  }

  selectClass(index) {
    this.selectedIndex = index;
    this._classroomService.getClass(index).subscribe(data => this.selectedClass = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      })
  }

}
