import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordPatternValidator, passwordValidator } from '../helpers/password.validator';
import { Account } from '../models/Account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  public addForm: FormGroup;
  public message: String;
  public success: boolean;

  constructor(private _formBuilder: FormBuilder, private _accountService: AccountService) { }

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      role:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['']
    }, {validators: [passwordValidator, passwordPatternValidator]});
  }

  get role() {
    return this.addForm.get('role');
  }

  get firstName() {
    return this.addForm.get('firstName');
  }

  get lastName() {
    return this.addForm.get('lastName');
  }

  get email() {
    return this.addForm.get('email');
  }

  get password() {
    return this.addForm.get('password');
  }

  get confirmPassword() {
    return this.addForm.get('confirmPassword');
  }

  addAccount() {
    let newAccount = {
      role: this.role.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      password: this.password.value,
      active: true
    }

    this._accountService.addAccount(newAccount).subscribe(
      data => {
        this.ngOnInit();
        this.success = true;
        this.message = "Account has been added successfully";
      },
      error => {
        this.success = false;
        this.message = error.error.message;
      });
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
