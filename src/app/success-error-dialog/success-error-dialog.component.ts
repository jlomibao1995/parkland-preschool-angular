import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-error-dialog',
  templateUrl: './success-error-dialog.component.html',
  styleUrls: ['./success-error-dialog.component.css']
})
export class SuccessErrorDialogComponent implements OnInit {
  @Input() public message: String;
  @Input() public success: boolean

  constructor() { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.message = null;
  }

}
