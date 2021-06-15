import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public email: String;
  public name: String;
  public role: String;
  public access: boolean;
  public id: number;

  constructor(private _accountService: AccountService, private _authenticationService: AuthenticationService, 
    private _router: Router) { }

  ngOnInit(): void {
    this.id = null;
    if (this._authenticationService.authenticated()) {
      this._authenticationService.populateAccountInfo().then((value) => {
        this.email = this._authenticationService.currentUser.email;
        this.name = this._authenticationService.currentUser.firstName + ' ' + this._authenticationService.currentUser.lastName;
        this.access = this._authenticationService.currentUser.schoolAccessAllowed;
        this.id = this._authenticationService.currentUser.id;
        this.role = this._authenticationService.currentUser.role;
      });
    } else {
      this._router.navigateByUrl("/login");
    }
  }

}
