import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
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
