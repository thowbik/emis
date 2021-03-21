import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfQualificationComponent } from './teacher-prof-qualification.component';

describe('TeacherProfQualificationComponent', () => {
  let component: TeacherProfQualificationComponent;
  let fixture: ComponentFixture<TeacherProfQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProfQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
