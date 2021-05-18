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

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['jeanlomibao@gmail.com', Validators.required],
      password: ['password', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  authenticate() {
      this._authenticationService.authenticate({
        email: this.email.value,
        password: this.password.value
      }).catch(error => this.message = error.error.message);
    }

}
