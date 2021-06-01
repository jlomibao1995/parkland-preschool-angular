import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public role: String;
  public access: boolean;

  constructor(private _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this._authenticationService.authenticated()) {
      this._authenticationService.populateAccountInfo().then((value) => {
        this.role = this._authenticationService.currentUser.role;
      });
    }
    
  }

  logout() {
    this._authenticationService.logout();
  }
}
