import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  role: String;
  authenticated: boolean;
  roles;

  constructor(private _authenticationService: AuthenticationService, private _accountService: AccountService) {
    this.roles = this._accountService.roles;
  }

  ngOnInit(): void {
    this.authenticated = false;
    if (this._authenticationService.authenticated()) {
      this.authenticated = true;
      this._authenticationService.populateAccountInfo().then((value) => {
        this.role = this._authenticationService.currentUser.role;
      });
    }
  }

  logout() {
    this._authenticationService.logout();
  }

}
