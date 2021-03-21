import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoonmealStudentReportComponent } from './noonmeal-student-report.component';

describe('NoonmealStudentReportComponent', () => {
  let component: NoonmealStudentReportComponent;
  let fixture: ComponentFixture<NoonmealStudentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoonmealStudentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoonmealStudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
