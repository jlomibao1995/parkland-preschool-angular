import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordPatternValidator, passwordValidator } from '../helpers/password.validator';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private fallBackUrl = window.location.href;
  public registerForm: FormGroup;
  public message: String;
  public success: boolean;
  public loading: boolean;

  constructor(private _accountService: AccountService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.message = null;
    this.success = null;

    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    }, {validators: [passwordValidator, passwordPatternValidator]});

    this.loading = false;
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  registerAccount() {
    this.loading = true;
    this._accountService.registerAccount({
      firstName : this.firstName.value,
      lastName: this.lastName.value,
      email : this.email.value,
      password : this.password.value
    }, this.fallBackUrl).subscribe(
      data => {
        this.message = 'Account registered: Check your email to complete registration'
        this.success = true;
        this.loading = false;
      },
      error => {
        this.message = error;
        this.success = false;
        this.loading = false;
      }
    );
  }

}
