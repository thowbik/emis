import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMigrationReportComponent } from './student-migration-report.component';

describe('StudentMigrationReportComponent', () => {
  let component: StudentMigrationReportComponent;
  let fixture: ComponentFixture<StudentMigrationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMigrationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMigrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
