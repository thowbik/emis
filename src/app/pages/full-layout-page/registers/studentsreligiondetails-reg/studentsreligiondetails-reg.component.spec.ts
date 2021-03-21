import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsreligiondetailsRegComponent } from './studentsreligiondetails-reg.component';

describe('StudentsreligiondetailsRegComponent', () => {
  let component: StudentsreligiondetailsRegComponent;
  let fixture: ComponentFixture<StudentsreligiondetailsRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsreligiondetailsRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsreligiondetailsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
