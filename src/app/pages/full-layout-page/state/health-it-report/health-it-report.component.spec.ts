import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthItReportComponent } from './health-it-report.component';

describe('HealthItReportComponent', () => {
  let component: HealthItReportComponent;
  let fixture: ComponentFixture<HealthItReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthItReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
