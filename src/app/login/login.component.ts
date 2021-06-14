import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public message: String;
  public loading: boolean;

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService,
    private _router: Router) { }

  ngOnInit(): void {
    if (this._authenticationService.authenticated()) {
      this._router.navigateByUrl('/myaccount');
    }

    this.loading = false;

    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  authenticate() {
    this.loading = true;
      this._authenticationService.authenticate({
        email: this.email.value,
        password: this.password.value
      }).catch(error => {
        this.message = error;
        this.loading = false;
      });
    }

}
