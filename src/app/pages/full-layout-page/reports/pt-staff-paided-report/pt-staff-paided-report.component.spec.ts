import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtStaffPaidedReportComponent } from './pt-staff-paided-report.component';

describe('PtStaffPaidedReportComponent', () => {
  let component: PtStaffPaidedReportComponent;
  let fixture: ComponentFixture<PtStaffPaidedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtStaffPaidedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtStaffPaidedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
