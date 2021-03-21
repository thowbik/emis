import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceregComponent } from './staff-attendancereg.component';

describe('StaffAttendanceregComponent', () => {
  let component: StaffAttendanceregComponent;
  let fixture: ComponentFixture<StaffAttendanceregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAttendanceregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAttendanceregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
