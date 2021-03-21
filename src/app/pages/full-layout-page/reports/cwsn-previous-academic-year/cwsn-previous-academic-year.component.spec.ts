import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwsnPreviousAcademicYearComponent } from './cwsn-previous-academic-year.component';

describe('CwsnPreviousAcademicYearComponent', () => {
  let component: CwsnPreviousAcademicYearComponent;
  let fixture: ComponentFixture<CwsnPreviousAcademicYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwsnPreviousAcademicYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwsnPreviousAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
