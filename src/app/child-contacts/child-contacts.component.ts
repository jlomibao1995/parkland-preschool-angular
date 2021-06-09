import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ChildContact } from '../models/ChildContact';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-child-contacts',
  templateUrl: './child-contacts.component.html',
  styleUrls: ['./child-contacts.component.css']
})
export class ChildContactsComponent implements OnInit, OnChanges {
  @Input() childId: number;
  public childContacts: ChildContact[];
  public contactTypes;
  public contactToAdd: string;
  @Output() public contactsUpdated: EventEmitter<string> = new EventEmitter();

  constructor(private _childService: ChildService, private _router: Router) {
    this.contactTypes = this._childService.contactsType;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._childService.getChildInfo(this.childId).subscribe(
      data => this.childContacts = data.childContactsList,
      error => this._router.navigateByUrl('/error')
    )
  }

  ngOnInit(): void {
    this.contactToAdd = null;

    if (this.childId) {
      this._childService.getChildInfo(this.childId).subscribe(
        data => this.childContacts = data.childContactsList,
        error => this._router.navigateByUrl('/error')
      )
    }
  }

  update() {
    this.ngOnInit();
    this.contactsUpdated.emit('updated');
  }

  getChildContacts(type) {
    let contactList = this.childContacts.filter(contact => contact.type == type);
    return contactList;
  }

  addContactType(type) {
    this.contactToAdd = type;
  }

}
