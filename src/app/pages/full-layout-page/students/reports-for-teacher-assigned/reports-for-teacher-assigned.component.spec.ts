import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsForTeacherAssignedComponent } from './reports-for-teacher-assigned.component';

describe('ReportsForTeacherAssignedComponent', () => {
  let component: ReportsForTeacherAssignedComponent;
  let fixture: ComponentFixture<ReportsForTeacherAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsForTeacherAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsForTeacherAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
