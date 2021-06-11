import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {
  public addChildForm: FormGroup;
  public genders;
  public message: string;
  public success: boolean;
  public loading: boolean;
  private accountId: number;
  @Output() updated: EventEmitter<string> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private _childService: ChildService,
    private _authenticationService: AuthenticationService) {
    this.genders = this._childService.gender;
   }

  ngOnInit(): void {
    this.message = null;
    this.success = null;
    this.loading = false;

    this.addChildForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this._authenticationService.populateAccountInfo().then((value) => {
      this.accountId = this._authenticationService.currentUser.id;
    });
  }

  get firstName() {
    return this.addChildForm.get('firstName');
  }

  get lastName() {
    return this.addChildForm.get('lastName');
  }

  addChild() {
    this.loading = true;

    let child = {
      firstName : this.firstName.value,
      lastName : this.lastName.value,
       gender : "",
      allergy : "",
      medicalConditions : "",
      account: {id : this.accountId}
    };

    this._childService.addChild(child).subscribe(
      data => {
        this.ngOnInit();
        this.success = true;
        this.message = 'Child information added'
        this.updated.emit('changed');
      }, error => {
        this.success = false;
        this.message = error;
        this.loading = false;
      }
    )
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

}
