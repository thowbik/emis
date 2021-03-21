import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaAttendanceCompletedComponent } from './pla-attendance-completed.component';

describe('PlaAttendanceCompletedComponent', () => {
  let component: PlaAttendanceCompletedComponent;
  let fixture: ComponentFixture<PlaAttendanceCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaAttendanceCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaAttendanceCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
