import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaAttendanceLearnersComponent } from './pla-attendance-learners.component';

describe('PlaAttendanceLearnersComponent', () => {
  let component: PlaAttendanceLearnersComponent;
  let fixture: ComponentFixture<PlaAttendanceLearnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaAttendanceLearnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaAttendanceLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
