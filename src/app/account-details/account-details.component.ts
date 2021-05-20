import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/Account';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit, OnChanges {
  editForm: FormGroup;
  editMode = false;
  passwordForm: FormGroup;
  @Input() account: Account;
  public passwordMode = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.editMode = false;
    this.passwordMode = false;

    this.editForm = this._formBuilder.group({
      role: [this.account.role, Validators.required],
      firstName: [this.account.firstName, Validators.required],
      lastName: [this.account.lastName, Validators.required],
      email: [this.account.email, Validators.required],
      address: [this.account.address, Validators.required],
      homePhoneNumber: [this.account.homePhoneNumber],
      workPhoneNumber: [this.account.workPhoneNumber],
      cellNumber: [this.account.cellNumber],
    });
  }

  ngOnInit(): void {
    this.passwordForm = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  get role() {
    return this.editForm.get('role');
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get address() {
    return this.editForm.get('address');
  }

  get email() {
    return this.editForm.get('email');
  }

  get homePhoneNumber() {
    return this.editForm.get('homePhoneNumber');
  }

  get homeWorkNumber() {
    return this.editForm.get('homeWorkNumber');
  }

  get cellNumber() {
    return this.editForm.get('cellNumber');
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  goToEditMode() {
    this.editMode = true
    this.passwordMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }

  changePasswordMode() {
    this.passwordMode = true;
  }

}
