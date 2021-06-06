import { Component, OnInit } from '@angular/core';
import { Child } from '../models/Child';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-registrations-guardian',
  templateUrl: './registrations-guardian.component.html',
  styleUrls: ['./registrations-guardian.component.css']
})
export class RegistrationsGuardianComponent implements OnInit {
  public childList: Child[];
  updated:boolean;

  constructor(private _accountService: AccountService, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this._authenticationService.populateAccountInfo().then((value) => {
      this.childList = this._authenticationService.currentUser.childList;
    });
  }

  updatedHandler() {
    this.updated = true;
  }

}
