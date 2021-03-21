import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteStudentRegComponent } from './rte-student-reg.component';

describe('RteStudentRegComponent', () => {
  let component: RteStudentRegComponent;
  let fixture: ComponentFixture<RteStudentRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteStudentRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteStudentRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
