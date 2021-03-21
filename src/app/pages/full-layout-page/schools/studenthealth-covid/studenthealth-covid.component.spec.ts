import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthealthCovidComponent } from './studenthealth-covid.component';

describe('StudenthealthCovidComponent', () => {
  let component: StudenthealthCovidComponent;
  let fixture: ComponentFixture<StudenthealthCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenthealthCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenthealthCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
