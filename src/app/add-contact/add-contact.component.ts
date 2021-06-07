import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { guardianContactValidator } from '../helpers/guardian.contact.validator';
import { ChildContact } from '../models/ChildContact';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit, OnChanges {
  public message: string;
  public success: boolean;
  public loading: boolean;
  @Input() childId;
  @Input() type;
  public contactTypes;
  public editMode: boolean;
  public done: boolean;

  public addContactForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _childService: ChildService) {
    this.contactTypes = this._childService.contactsType;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.done = false;
  
    let initialHomephone = '';
    let initialCellPhone = '';
    let initialWorkPhone = '';
    let initialAddress = '';
    let initialRelation = '';
    let autoValue = 'N/A';

    if (changes.type) {
      if (this.type == this.contactTypes.other) {
        initialCellPhone = autoValue;
        initialWorkPhone = autoValue;
        initialRelation = autoValue;
      } else if (this.type == this.contactTypes.emergency) {
        initialWorkPhone = autoValue;
        } else if (this.type == this.contactTypes.pickup) {
          initialHomephone = autoValue;
          initialWorkPhone = autoValue;
          initialCellPhone = autoValue;
          initialAddress = autoValue;
          initialRelation = autoValue;
        }
      }

      this.addContactForm = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        homePhoneNumber: [initialHomephone, Validators.required],
        workPhoneNumber: [initialWorkPhone, Validators.required],
        cellNumber: [initialCellPhone, Validators.required],
        address: [initialAddress, Validators.required],
        relationToChild: [initialRelation, Validators.required],
        type : [this.type]
      }, {validators : [guardianContactValidator]});
    }

  ngOnInit(): void {
    this.editMode = false;
    this.success = null;
    this.message = null;
    this.loading = false;
  }

  get firstName() {
    return this.addContactForm.get('firstName');
  }

  get lastName() {
    return this.addContactForm.get('lastName');
  }

  get address() {
    return this.addContactForm.get('address');
  }

  get homePhoneNumber() {
    return this.addContactForm.get('homePhoneNumber');
  }

  get workPhoneNumber() {
    return this.addContactForm.get('workPhoneNumber');
  }

  get cellNumber() {
    return this.addContactForm.get('cellNumber');
  }

  get relationToChild() {
    return this.addContactForm.get('relationToChild');
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

  edit() {
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  addContact() {
    this.loading = true;
    let contact = {
      firstName : this.firstName.value,
      lastName : this.lastName.value,
      address: this.address.value,
      homePhoneNumber : this.homePhoneNumber.value,
      workPhoneNumber : this.homePhoneNumber.value,
      cellNumber : this.cellNumber.value,
      relationToChild : this.relationToChild.value,
      type : this.type,
      child: {id : this.childId}
    }

    this._childService.addChildContact(contact).subscribe(
      data => {
        this.message = 'Child contact information was added';
        this.success = true;
        this.loading = false;
        this.done = true;
      }, error => {
        this.message = error;
        this.success = false;
        this.loading = false;
      }
    )
  }

}
