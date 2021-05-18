import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  addForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      role:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    });
  }

  get role() {
    return this.addForm.get('role');
  }

  get firstName() {
    return this.addForm.get('firstName');
  }

  get lastName() {
    return this.addForm.get('lastName');
  }

  get email() {
    return this.addForm.get('email');
  }

  get password() {
    return this.addForm.get('password');
  }

  get confirmPassword() {
    return this.addForm.get('confirmPassword');
  }

}
