import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordPatternValidator, passwordValidator } from '../helpers/password.validator';
import { Account } from '../models/Account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit, OnChanges {
  public editForm: FormGroup;
  public editMode = false;
  public passwordForm: FormGroup;
  public account: Account;
  @Input() public accountId: number;
  public passwordMode = false;
  public message: String;
  public success: boolean;

  constructor(private _formBuilder: FormBuilder, private _accountService: AccountService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
    this.getAccount();
  }

  ngOnInit(): void {
    this.editMode = false;
    this.passwordMode = false;
    this.message = null;
    this.success = null;

    this.editForm = this._formBuilder.group({
      role: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: [''],
      homePhoneNumber: [''],
      workPhoneNumber: [''],
      cellNumber: [''],
    });

    this.passwordForm = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: [passwordValidator, passwordPatternValidator] })
  }

  getAccount() {
    if (this.accountId) {
      this._accountService.getAccount(this.accountId).subscribe(
        data => {
          this.account = data

          this.editForm = this._formBuilder.group({
            role: [this.account.role, Validators.required],
            firstName: [this.account.firstName, Validators.required],
            lastName: [this.account.lastName, Validators.required],
            email: [this.account.email, Validators.required],
            address: [this.account.address],
            homePhoneNumber: [this.account.homePhoneNumber],
            workPhoneNumber: [this.account.workPhoneNumber],
            cellNumber: [this.account.cellNumber],
          });
        },
        error => {
          this.message = error.error.message
          console.log(this.message);
        });
    }
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

  get workPhoneNumber() {
    return this.editForm.get('workPhoneNumber');
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
    this.getAccount();
  }

  changePasswordMode() {
    this.passwordMode = true;
  }

  saveAccountChanges() {
    let address = this.address.value ? this.address.value : '';
    let homePhoneNumber = this.homePhoneNumber.value ? this.homePhoneNumber.value : '';
    let workPhoneNumber = this.workPhoneNumber.value ? this.workPhoneNumber.value : '';
    let cellNumber = this.cellNumber.value ? this.cellNumber.value : '';

    const params = new HttpParams()
      .set('role', this.role.value)
      .set('email', this.email.value)
      .set('firstName', this.firstName.value)
      .set('lastName', this.lastName.value)
      .set('address', address)
      .set('homePhoneNumber', homePhoneNumber)
      .set('workPhoneNumber', workPhoneNumber)
      .set('cellNumber', cellNumber);

    this._accountService.updateAccount(this.account.id, params).subscribe(
      data => this.successMessage('Account changes have been saved successfully'),
      error => (this.errorMessage(error))
    );
  }

  changePassword() {
    const params = new HttpParams()
      .set('password', this.password.value);

    this._accountService.updateAccount(this.accountId, params).subscribe(
      data => this.successMessage('Password has been changed successfully'),
      error => (this.errorMessage(error))
    );
  }

  successMessage(successMesage: String) {
    this.ngOnInit();
    this.getAccount();
    this.message = successMesage;
    this.success = true;
  }

  errorMessage(error: HttpErrorResponse) {
    this.message = error.error.message;
    this.success = false;
  }

}
