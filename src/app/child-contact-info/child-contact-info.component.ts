import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildContact } from '../models/ChildContact';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-child-contact-info',
  templateUrl: './child-contact-info.component.html',
  styleUrls: ['./child-contact-info.component.css']
})
export class ChildContactInfoComponent implements OnInit, OnChanges {
  public message: string;
  public success: boolean;
  public loading: boolean;
  @Input() contact: ChildContact;
  public contactTypes;
  public editMode: boolean;

  public editContactForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _childService: ChildService) {
    this.contactTypes = this._childService.contactsType;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editContactForm = this._formBuilder.group({
      firstName: [this.contact.firstName, Validators.required],
      lastName: [this.contact.lastName, Validators.required],
      homePhoneNumber: [this.contact.homePhoneNumber, Validators.required],
      workPhoneNumber: [this.contact.workPhoneNumber, Validators.required],
      cellNumber: [this.contact.cellNumber, Validators.required],
      address: [this.contact.address, Validators.required],
      relationToChild: [this.contact.relationToChild, Validators.required]
    });
  }

  ngOnInit(): void {
    this.editMode = false;
  }

  get firstName() {
    return this.editContactForm.get('firstName');
  }

  get lastName() {
    return this.editContactForm.get('lastName');
  }

  get address() {
    return this.editContactForm.get('address');
  }

  get homePhoneNumber() {
    return this.editContactForm.get('homePhoneNumber');
  }

  get workPhoneNumber() {
    return this.editContactForm.get('workPhoneNumber');
  }

  get cellNumber() {
    return this.editContactForm.get('cellNumber');
  }

  get relationToChild() {
    return this.editContactForm.get('relationToChild');
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

  saveChanges() {
    this.loading = true;
    const params = new HttpParams()
      .set('firstName', this.firstName.value)
      .set('lastName', this.lastName.value)
      .set('address', this.address.value)
      .set('homePhoneNumber', this.homePhoneNumber.value)
      .set('workPhoneNumber', this.workPhoneNumber.value)
      .set('cellNumber', this.cellNumber.value)
      .set('relationToChild', this.relationToChild.value);

    this._childService.updateChildContact(this.contact.id, params).subscribe(
      data => {
        this.message = 'Child contact information changes saved';
        this.success = true;
        this.loading = false;
        this.editMode = false;

        this._childService.getChildContact(this.contact.id).subscribe(
          data => {
            this.contact = data;
            
            this.editContactForm.patchValue({
              firstName: this.contact.firstName,
              lastname: this.contact.lastName,
              address: this.contact.address,
              homePhoneNumber: this.contact.homePhoneNumber,
              workPhoneNumber: this.contact.workPhoneNumber,
              cellNumber: this.contact.cellNumber,
              relationToChild: this.contact.relationToChild
            });
          });
      }, error => {
        this.success = false;
        this.message = error;
        this.loading = false;
      });
  }

}
