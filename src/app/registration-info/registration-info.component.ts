import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disciplineSignatureValidator, guardianSignatureValidator, outdoorSignatureValidator, safetySignatureValidator, sickSignatureValidator } from '../helpers/signature.validator';
import { ChildContact } from '../models/ChildContact';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-registration-info',
  templateUrl: './registration-info.component.html',
  styleUrls: ['./registration-info.component.css']
})
export class RegistrationInfoComponent implements OnInit, OnChanges {
  currentPage = 1;
  @Input() childId;
  childInfoComplete = false;
  numOfChildContacts: number;

  signForm: FormGroup;
  accountName: String;

  types;

  @Output() infoComplete: EventEmitter<String> = new EventEmitter();
  @Output() goBack: EventEmitter<String> = new EventEmitter();

  constructor(private _childService: ChildService, private _formBuilder: FormBuilder) {
    this.types = this._childService.contactsType;
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.contactsHandler(null);
  }

  get discipline() {
    return this.signForm.get('discipline');
  }

  get safety() {
    return this.signForm.get('safety');
  }

  get outdoor() {
    return this.signForm.get('outdoor');
  }

  get sick() {
    return this.signForm.get('sick');
  }

  ngOnInit(): void {
    this.signForm = this._formBuilder.group({
      discipline: ['', Validators.required],
      safety: ['', Validators.required],
      outdoor: ['', Validators.required],
      sick: ['', Validators.required]
    });
  }

  next() {
    this.currentPage += 1;
  }

  previous() {
    this.currentPage -= 1;
  }

  prevParent() {
    this.goBack.emit('back');
  }

  childInfoDone() {
    this.childInfoComplete = true;
  }

  infoCompleted() {
    this.infoComplete.emit('done');
  }

  contactsHandler(event) {
    this._childService.getChildInfo(this.childId).subscribe(
      data => {
        this.numOfChildContacts = data.childContactsList.length;
        this.accountName = data.account.firstName + ' ' + data.account.lastName;

        //get guardian name for signing
        let mother: ChildContact[] = data.childContactsList.filter(contact => contact.relationToChild == 'Mother' || contact.relationToChild == 'mother');
        let father: ChildContact[] = data.childContactsList.filter(contact => contact.relationToChild == 'Father' || contact.relationToChild == 'father');

        let motherName: string;
        if (mother.length != 0) {
          motherName = mother[0].firstName + ' ' + mother[0].lastName;
        } 

        let fatherName: string;
        if (father.length != 0) {
          fatherName = father[0].firstName + ' ' + father[0].lastName;
        }
         
        let guardianName = '';

        if (motherName == this.accountName) {
          guardianName = motherName;
        } else if (fatherName == this.accountName) {
          guardianName = fatherName
        }

        this.signForm = this._formBuilder.group({
          discipline: ['', Validators.required],
          safety: ['', Validators.required],
          outdoor: ['', Validators.required],
          sick: ['', Validators.required],
          accountName: [this.accountName],
          parentName: [guardianName]
        }, { validators: [disciplineSignatureValidator, outdoorSignatureValidator, safetySignatureValidator, sickSignatureValidator, guardianSignatureValidator] });
      });
  }

}
