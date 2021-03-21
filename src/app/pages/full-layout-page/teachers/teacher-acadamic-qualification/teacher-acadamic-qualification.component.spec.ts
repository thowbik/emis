import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAcadamicQualificationComponent } from './teacher-acadamic-qualification.component';

describe('TeacherAcadamicQualificationComponent', () => {
  let component: TeacherAcadamicQualificationComponent;
  let fixture: ComponentFixture<TeacherAcadamicQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAcadamicQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAcadamicQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
