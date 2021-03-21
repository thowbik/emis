import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommonPoolReportComponent } from './student-common-pool-report.component';

describe('StudentCommonPoolReportComponent', () => {
  let component: StudentCommonPoolReportComponent;
  let fixture: ComponentFixture<StudentCommonPoolReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCommonPoolReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCommonPoolReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
