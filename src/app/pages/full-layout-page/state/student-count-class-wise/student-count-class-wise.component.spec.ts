import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCountClassWiseComponent } from './student-count-class-wise.component';

describe('StudentCountClassWiseComponent', () => {
  let component: StudentCountClassWiseComponent;
  let fixture: ComponentFixture<StudentCountClassWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCountClassWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCountClassWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
