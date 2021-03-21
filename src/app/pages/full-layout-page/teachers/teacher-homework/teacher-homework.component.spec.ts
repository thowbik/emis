import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHomeworkComponent } from './teacher-homework.component';

describe('TeacherHomeworkComponent', () => {
  let component: TeacherHomeworkComponent;
  let fixture: ComponentFixture<TeacherHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
