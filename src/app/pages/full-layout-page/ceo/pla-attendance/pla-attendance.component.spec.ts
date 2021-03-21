import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PLAAttendanceComponent } from './pla-attendance.component';

describe('PLAAttendanceComponent', () => {
  let component: PLAAttendanceComponent;
  let fixture: ComponentFixture<PLAAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PLAAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PLAAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
