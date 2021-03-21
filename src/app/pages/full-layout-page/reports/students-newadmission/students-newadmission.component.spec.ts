import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsNewadmissionComponent } from './students-newadmission.component';

describe('StudentsNewadmissionComponent', () => {
  let component: StudentsNewadmissionComponent;
  let fixture: ComponentFixture<StudentsNewadmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsNewadmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsNewadmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
