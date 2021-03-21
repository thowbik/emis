import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitIndiaReportComponent } from './fit-india-report.component';

describe('FitIndiaReportComponent', () => {
  let component: FitIndiaReportComponent;
  let fixture: ComponentFixture<FitIndiaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitIndiaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitIndiaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
