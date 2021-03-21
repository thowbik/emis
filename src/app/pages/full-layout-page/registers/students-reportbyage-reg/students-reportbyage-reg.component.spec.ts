import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsReportbyageRegComponent } from './students-reportbyage-reg.component';

describe('StudentsReportbyageRegComponent', () => {
  let component: StudentsReportbyageRegComponent;
  let fixture: ComponentFixture<StudentsReportbyageRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsReportbyageRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsReportbyageRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
