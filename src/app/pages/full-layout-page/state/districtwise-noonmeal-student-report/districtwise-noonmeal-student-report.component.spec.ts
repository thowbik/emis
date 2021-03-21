import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictwiseNoonmealStudentReportComponent } from './districtwise-noonmeal-student-report.component';

describe('DistrictwiseNoonmealStudentReportComponent', () => {
  let component: DistrictwiseNoonmealStudentReportComponent;
  let fixture: ComponentFixture<DistrictwiseNoonmealStudentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictwiseNoonmealStudentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictwiseNoonmealStudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
