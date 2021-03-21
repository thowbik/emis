import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwsnStudentRegComponent } from './cwsn-student-reg.component';

describe('CwsnStudentRegComponent', () => {
  let component: CwsnStudentRegComponent;
  let fixture: ComponentFixture<CwsnStudentRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwsnStudentRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwsnStudentRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
