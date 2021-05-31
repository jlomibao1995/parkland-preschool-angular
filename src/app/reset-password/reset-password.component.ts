import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { passwordPatternValidator, passwordValidator } from '../helpers/password.validator';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public loading: boolean;
  public emailForm: FormGroup;
  public changePassForm: FormGroup;
  public message: string;
  public success: boolean;
  public showChangeForm: boolean;
  private uuid: string;
  private fallBackUrl = window.location.href;

  constructor(private _formBuilder: FormBuilder, private _accountService: AccountService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = false;
    this.message = null;
    this.success = null;
    this.showChangeForm = false;

    this._route.params.subscribe(params => {
      this.uuid = params['uuid'];

      if (this.uuid) {
        this.showChangeForm = true;
      }
    });

    this.emailForm = this._formBuilder.group({
      email: ['', Validators.required]
    });

    this.changePassForm = this._formBuilder.group({
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    }, {validators: [passwordValidator, passwordPatternValidator]});

  }

  get email() {
    return this.emailForm.get('email');
  }

  get password() {
    return this.changePassForm.get('password');
  }

  get confirmPassword() {
    return this.changePassForm.get('confirmPassword');
  }

  changePassword() {
    this.loading = true;
    const params = new HttpParams().set('newPassword', this.password.value);

    this._accountService.changePassword(this.uuid, params).subscribe(
      data => {
        this.success = true;
        this.loading = false;
      },
      error => {
        this.success = false;
        this.message = error;
        this.loading = false;
      }
    )
  }

  requestPassChange() {
    this.loading = true;
    const params = new HttpParams().set('fallBackUrl', this.fallBackUrl);
    this._accountService.requestPasswordChange(this.email.value, params).subscribe(
      data => {
        this.success = true;
        this.loading = false;
      },
      error => {
        this.success = false;
        this.message = error;
        this.loading = false;
      }
    );
  }

}
