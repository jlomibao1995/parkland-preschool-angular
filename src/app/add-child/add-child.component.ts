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
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      healthCareNum: ['', Validators.required],
      immunizations: ['', Validators.required],
      doctorClinic: ['', Validators.required],
      medicalConditions: [''],
      chickenPox: ['', Validators.required],
      allergy: [''],
      medications: ['', Validators.required],
      medicalPhoneNumber: ['', Validators.required]
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

  get gender() {
    return this.addChildForm.get('gender');
  }

  get birthdate() {
    return this.addChildForm.get('birthdate');
  }

  get address() {
    return this.addChildForm.get('address');
  }

  get postalCode() {
    return this.addChildForm.get('postalCode');
  }

  get healthCareNum() {
    return this.addChildForm.get('healthCareNum');
  }

  get immunizations() {
    return this.addChildForm.get('immunizations');
  }

  get doctorClinic() {
    return this.addChildForm.get('doctorClinic');
  }

  get chickenPox() {
    return this.addChildForm.get('chickenPox');
  }

  get medications() {
    return this.addChildForm.get('medications');
  }

  get medicalPhoneNumber() {
    return this.addChildForm.get('medicalPhoneNumber');
  }

  get medicalConditions() {
    return this.addChildForm.get('medicalConditions');
  }

  addChild() {
    this.loading = true;

    let child = {
      firstName : this.firstName.value,
      lastName : this.lastName.value,
      gender : this.gender.value,
      birthdate : this.birthdate.value,
      address : this.address.value,
      postalCode : this.postalCode.value,
      healthCareNum : this.healthCareNum.value,
      allergy : this.addChildForm.get('allergy').value,
      doctorClinic : this.doctorClinic.value,
      medicalPhoneNumber : this.medicalPhoneNumber.value,
      immunizations : this.immunizations.value,
      chickenPox : this.chickenPox.value,
      medications : this.medications.value,
      medicalConditions : this.medicalConditions.value,
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
