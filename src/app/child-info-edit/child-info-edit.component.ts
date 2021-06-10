import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Child } from '../models/Child';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-child-info-edit',
  templateUrl: './child-info-edit.component.html',
  styleUrls: ['./child-info-edit.component.css']
})
export class ChildInfoEditComponent implements OnInit, OnChanges {
  public genders;
  public message: string;
  public success: boolean;
  public loading: boolean;
  public editChildForm: FormGroup;
  public child: Child;
  @Input() childId: number;
  public editMode:boolean;
  @Output() infoComplete: EventEmitter<string> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private _childService: ChildService) {
    this.genders = this._childService.gender;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editMode = false;
    if (this.childId) {
      this.loading = true;
      this.getChild()
    }
  }

  getChild() {
    this._childService.getChildInfo(this.childId).subscribe(
      data => {
        this.child = data;
        this.loading = false;
        this.populateForm();
        
        this.editMode = true;
        if (this.checkNullFields()) {
          this.infoComplete.emit('done');
          this.editMode = false;
        }

      });
  }

  ngOnInit(): void {
    this.loading = false;
    this.editMode = false;

    this.editChildForm = this._formBuilder.group({
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

    if (this.childId != null) {
      this.getChild();
    }
  }

  populateForm() {
    this.editChildForm = this._formBuilder.group({
      firstName: [this.child.firstName, Validators.required],
      lastName: [this.child.lastName, Validators.required],
      gender: [this.child.gender, Validators.required],
      birthdate: [this.child.birthdate, Validators.required],
      address: [this.child.address, Validators.required],
      postalCode: [this.child.postalCode, Validators.required],
      healthCareNum: [this.child.healthCareNumber, Validators.required],
      immunizations: [this.child.immunizations, Validators.required],
      doctorClinic: [this.child.doctorClinic, Validators.required],
      medicalConditions: [this.child.medicalConditions == null ? this.child.medicalConditions : ''],
      chickenPox: [this.child.chickenPox, Validators.required],
      allergy: [this.child.allergy == null ? this.child.allergy : ''],
      medications: [this.child.medications, Validators.required],
      medicalPhoneNumber: [this.child.medicalPhoneNumber, Validators.required]
    });
  }

  get firstName() {
    return this.editChildForm.get('firstName');
  }

  get lastName() {
    return this.editChildForm.get('lastName');
  }

  get gender() {
    return this.editChildForm.get('gender');
  }

  get birthdate() {
    return this.editChildForm.get('birthdate');
  }

  get address() {
    return this.editChildForm.get('address');
  }

  get postalCode() {
    return this.editChildForm.get('postalCode');
  }

  get healthCareNum() {
    return this.editChildForm.get('healthCareNum');
  }

  get immunizations() {
    return this.editChildForm.get('immunizations');
  }

  get doctorClinic() {
    return this.editChildForm.get('doctorClinic');
  }

  get chickenPox() {
    return this.editChildForm.get('chickenPox');
  }

  get medications() {
    return this.editChildForm.get('medications');
  }

  get medicalPhoneNumber() {
    return this.editChildForm.get('medicalPhoneNumber');
  }

  get medicalConditions() {
    return this.editChildForm.get('medicalConditions');
  }

  messageChangedHandler(message: String) {
    this.message = null;
  }

  edit(){
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  saveChanges(){
    this.loading = true;

    const params = new HttpParams()
    .set('firstName', this.firstName.value)
    .set('lastName', this.lastName.value)
    .set('gender', this.gender.value)
    .set('birthdate', this.birthdate.value)
    .set('address', this.address.value)
    .set('postalCode', this.postalCode.value)
    .set('healthCareNumber', this.healthCareNum.value)
    .set('allergy', this.editChildForm.get('allergy').value)
    .set('doctorClinic', this.doctorClinic.value)
    .set('medicalPhoneNumber', this.medicalPhoneNumber.value)
    .set('immunizations', this.immunizations.value)
    .set('chickenPox', this.chickenPox.value)
    .set('medicalConditions', this.medicalConditions.value)
    .set('medications', this.medications.value);

    this._childService.updateChildInfo(this.childId, params).subscribe(
      data => {
        this.ngOnInit();
        this.success = true;
        this.message = "Child information changes saved";
        this.loading = false;
      }
    )
  }

  checkNullFields() {
    if (!this.child.firstName || !this.child.lastName || !this.child.gender || !this.child.birthdate || !this.child.address ||
      !this.child.postalCode || !this.child.healthCareNumber || !this.child.doctorClinic || !this.child.medicalPhoneNumber ||
      this.child.immunizations == null || this.child.chickenPox == null || this.child.medications == null) {
      return false;
    }

    return true;
  }

}
