import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTransferRequestComponent } from './pending-transfer-request.component';

describe('PendingTransferRequestComponent', () => {
  let component: PendingTransferRequestComponent;
  let fixture: ComponentFixture<PendingTransferRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTransferRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
