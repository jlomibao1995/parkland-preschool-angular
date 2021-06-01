import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordPatternValidator, passwordValidator } from '../helpers/password.validator';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';

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
  public activation: boolean;

  constructor(private _accountService: AccountService, private _formBuilder: FormBuilder, private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    if (this._authenticationService.authenticated()) {
      this._router.navigateByUrl('/myaccount');
    }

    this.message = null;
    this.success = null;
    this.activation = false;

    this._route.params.subscribe(params => {
      let uuid = params['uuid'];
      this.loading = true;

      if (uuid) {
        this.activation = true;
        this._accountService.activateAccount(uuid).subscribe(
          data => {
            this.success = true;
            this.loading = false;
          }
        , error => {
          this.success = false;
          this.message = error;
          this.loading = false;
        })
      }
    });

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
