import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public email: string;
  public name: string;
  public role: string;
  public access: boolean;
  public id: number;

  constructor(private _accountService: AccountService, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.id = null;
    this._authenticationService.populateAccountInfo().then((value) => {
      this.email = this._authenticationService.email;
      this.name = this._authenticationService.name;
      this.access = this._authenticationService.access;
      this.id = this._authenticationService.id;
      this.role = this._authenticationService.role;
    });
  }

}
