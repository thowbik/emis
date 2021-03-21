import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersdashboardComponent } from './teachersdashboard.component';

describe('TeachersdashboardComponent', () => {
  let component: TeachersdashboardComponent;
  let fixture: ComponentFixture<TeachersdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
