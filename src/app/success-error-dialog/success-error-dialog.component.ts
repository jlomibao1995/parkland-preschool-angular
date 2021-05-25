import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-error-dialog',
  templateUrl: './success-error-dialog.component.html',
  styleUrls: ['./success-error-dialog.component.css']
})
export class SuccessErrorDialogComponent implements OnInit, OnChanges {
  @Input() public message: String;
  @Input() public success: boolean;
  @Output() messageChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.messageChanged.emit(null);
  }

}
