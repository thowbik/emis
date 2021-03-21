import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParttimeteachersalaryreportComponent } from './parttimeteachersalaryreport.component';

describe('ParttimeteachersalaryreportComponent', () => {
  let component: ParttimeteachersalaryreportComponent;
  let fixture: ComponentFixture<ParttimeteachersalaryreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParttimeteachersalaryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParttimeteachersalaryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
