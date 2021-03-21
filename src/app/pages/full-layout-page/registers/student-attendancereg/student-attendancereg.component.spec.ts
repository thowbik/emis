import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceregComponent } from './student-attendancereg.component';

describe('StudentAttendanceregComponent', () => {
  let component: StudentAttendanceregComponent;
  let fixture: ComponentFixture<StudentAttendanceregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendanceregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendanceregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
