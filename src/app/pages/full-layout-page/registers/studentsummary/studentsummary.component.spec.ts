import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsummaryComponent } from './studentsummary.component';

describe('StudentsummaryComponent', () => {
  let component: StudentsummaryComponent;
  let fixture: ComponentFixture<StudentsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
