import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteReimbursementComponent } from './rte-reimbursement.component';

describe('RteReimbursementComponent', () => {
  let component: RteReimbursementComponent;
  let fixture: ComponentFixture<RteReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
