import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCountSchoolwiseComponent } from './student-count-schoolwise.component';

describe('StudentCountSchoolwiseComponent', () => {
  let component: StudentCountSchoolwiseComponent;
  let fixture: ComponentFixture<StudentCountSchoolwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCountSchoolwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCountSchoolwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
