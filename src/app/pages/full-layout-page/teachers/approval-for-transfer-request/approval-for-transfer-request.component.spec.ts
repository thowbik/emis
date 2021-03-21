import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalForTransferRequestComponent } from './approval-for-transfer-request.component';

describe('ApprovalForTransferRequestComponent', () => {
  let component: ApprovalForTransferRequestComponent;
  let fixture: ComponentFixture<ApprovalForTransferRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalForTransferRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalForTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
