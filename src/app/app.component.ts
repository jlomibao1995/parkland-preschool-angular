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
  public email: string;
  public name: string;
  public role: string;
  public access: boolean;

  constructor(private _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this._authenticationService.populateAccountInfo().then((value) => {
      this.email = this._authenticationService.email;
      this.name = this._authenticationService.name;
    });
    
  }

  logout() {
    this._authenticationService.logout();
  }
}
