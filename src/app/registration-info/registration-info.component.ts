import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disciplineSignatureValidator, outdoorSignatureValidator, safetySignatureValidator, sickSignatureValidator } from '../helpers/signature.validator';
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

  @Output() infoComplete: EventEmitter<String> = new EventEmitter();
  @Output() goBack: EventEmitter<String> = new EventEmitter();

  constructor(private _childService: ChildService, private _formBuilder: FormBuilder) { }

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

        this.signForm = this._formBuilder.group({
          discipline: ['', Validators.required],
          safety: ['', Validators.required],
          outdoor: ['', Validators.required],
          sick: ['', Validators.required],
          accountName: [this.accountName]
        }, { validators: [disciplineSignatureValidator, outdoorSignatureValidator, safetySignatureValidator, sickSignatureValidator] });
      });
  }

}
