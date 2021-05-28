import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Child } from '../models/Child';
import { ChildContact } from '../models/ChildContact';
import { ChildService } from '../services/child.service';

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

  constructor(private _childService: ChildService) {
    this.contactsType = this._childService.contactsType;
    this.gender = this._childService.gender;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._childService.getChildInfo(this.childId).subscribe(
      data => this.child = data,
      error => console.log(error.error.message)
    )
  }

  ngOnInit(): void {
  }

  getChildContacts(type) {
    let contactList = this.child.childContactsList.filter(contact => contact.type == type);
    return contactList;
  }

}
