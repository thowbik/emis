import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStaffClubpartComponent } from './attendance-staff-clubpart.component';

describe('AttendanceStaffClubpartComponent', () => {
  let component: AttendanceStaffClubpartComponent;
  let fixture: ComponentFixture<AttendanceStaffClubpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceStaffClubpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceStaffClubpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
