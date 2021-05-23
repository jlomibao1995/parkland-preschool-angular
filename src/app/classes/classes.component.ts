import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Classroom } from '../models/Classroom';
import { ClassesService } from '../services/classroom.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  public classes: [];
  public selectedClass: Classroom;
  public message: String;
  public selectedId: number;
  public pages: number[] = [];

  public totalPages: number;
  public currentPage = 1;
  public numOfClasses = 10;
  public totalClasses: number;

  public classNumForm: FormGroup;

  constructor(private _classroomService: ClassesService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.classNumForm = this._formBuilder.group({
      numOfClasses: [10]
    });

    this.goToPage(this.currentPage);
  }

  selectClass(id) {
    this.selectedId = id;
    this._classroomService.getClass(id).subscribe(data => this.selectedClass = data,
      error => {
        this.message = error.error.message
        console.log(this.message);
      })
  }

  goToPage(page) {
    this.pages = [];
    this.currentPage = page;

    this._classroomService.getClasses(this.currentPage, this.numOfClasses).subscribe(
      data => {
        this.classes = data.content;
        this.totalPages = data.totalPages;
        this.totalClasses = data.totalElements;

        //figure out which page buttons are visible
        let start = this.currentPage - 2;
        if (start <= 0) {
          start = 1;
        }

        for (let i = 0; i < 5; i++) {
          if (this.totalPages == 0) {
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

  changeClassesNum() {
    this.numOfClasses = this.classNumForm.get('numOfClasses').value;
    this.goToPage(1);
  }

}
