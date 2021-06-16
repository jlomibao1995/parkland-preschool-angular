import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  role: String;
  authenticated: boolean;
  roles;

  constructor(private _authenticationService: AuthenticationService, private _accountService: AccountService,
    private _cookieService: CookieService, private _router: Router) {
    this.roles = this._accountService.roles;
  }

  ngOnInit(): void {
    this.authenticated = false;
    if (this._authenticationService.authenticated()) {
      this.authenticated = true;
      this._accountService.getMyAccount().subscribe(
        data =>  this.role = data.role
      );
    }
  }

  logout() {
    this._authenticationService.logout().subscribe(
      data => {
        this._cookieService.remove('email');
        this._router.navigateByUrl('/login');
      }
    );
  }

}
