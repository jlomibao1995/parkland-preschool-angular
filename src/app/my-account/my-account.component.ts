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
   email: String;
   name: String;
   role: String;
   access: boolean;
   id: number;
   loading: boolean;

  constructor(private _accountService: AccountService, private _authenticationService: AuthenticationService, 
    private _router: Router) { }

  ngOnInit(): void {
    this.id = null;
    this.loading = true;
    if (this._authenticationService.authenticated()) {
      this._accountService.getMyAccount().subscribe(
        data => {
          this.email = data.email;
          this.name = data.firstName + ' ' + data.lastName;
          this.role = data.role;
          this.id = data.id;
          this.access = data.schoolAccessAllowed;
          this.loading = false;
        }
      )
    } else {
      this._router.navigateByUrl("/login");
    }
  }

}
