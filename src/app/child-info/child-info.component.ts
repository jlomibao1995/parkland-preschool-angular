import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Child } from '../models/Child';
import { ChildService } from '../services/child.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-child-info',
  templateUrl: './child-info.component.html',
  styleUrls: ['./child-info.component.css']
})
export class ChildInfoComponent implements OnInit, OnChanges {
  @Input() childId: number;
  public child: Child;
  public contactsType;
  public gender;

  constructor(private _childService: ChildService, private _reportService: ReportService) {
    this.contactsType = this._childService.contactsType;
    this.gender = this._childService.gender;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._childService.getChildInfo(this.childId).subscribe(
      data => this.child = data);
  }

  ngOnInit(): void {
  }

  getChildContacts(type) {
    let contactList = this.child.childContactsList.filter(contact => contact.type == type);
    return contactList;
  }

  // generatePDF() {
  //   this._reportService.createPDF_HTML("child-info");
  // }

}
