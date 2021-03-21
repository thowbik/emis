import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidSummaryReportComponent } from './covid-summary-report.component';

describe('CovidSummaryReportComponent', () => {
  let component: CovidSummaryReportComponent;
  let fixture: ComponentFixture<CovidSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
