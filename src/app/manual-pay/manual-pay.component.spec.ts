import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPayComponent } from './manual-pay.component';

describe('ManualPayComponent', () => {
  let component: ManualPayComponent;
  let fixture: ComponentFixture<ManualPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
