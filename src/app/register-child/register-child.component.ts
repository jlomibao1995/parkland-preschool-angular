import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Child } from '../models/Child';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.css']
})
export class RegisterChildComponent implements OnInit {
  public childList: Child[];
  public selectedChildId: number;
  public childForm: FormGroup;
  public showAddChildForm: boolean;
  public currentPage = 1;

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.showAddChildForm = false;
    
    this.childForm = this._formBuilder.group({
      childId : ['', Validators.required]
    });

    this._authenticationService.populateAccountInfo().then((value) => {
      this.childList = this._authenticationService.currentUser.childList;
    });
  }

  updatedHandler(event) {
    this.ngOnInit();
  }

  selectChild() {
    if (this.childForm.get('childId').value == 'new') {
      this.showAddChildForm = true;
      this.selectedChildId = null;
    } else {
      this.showAddChildForm = false;
      this.selectedChildId = this.childForm.get('childId').value;
    }
  }

  next() {
    this.currentPage += 1;
  }

}
