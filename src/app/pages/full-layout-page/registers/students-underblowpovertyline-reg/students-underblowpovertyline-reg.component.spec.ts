import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsUnderblowpovertylineRegComponent } from './students-underblowpovertyline-reg.component';

describe('StudentsUnderblowpovertylineRegComponent', () => {
  let component: StudentsUnderblowpovertylineRegComponent;
  let fixture: ComponentFixture<StudentsUnderblowpovertylineRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsUnderblowpovertylineRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsUnderblowpovertylineRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
