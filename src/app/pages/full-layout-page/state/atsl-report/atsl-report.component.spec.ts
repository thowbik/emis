import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtslReportComponent } from './atsl-report.component';

describe('AtslReportComponent', () => {
  let component: AtslReportComponent;
  let fixture: ComponentFixture<AtslReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtslReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtslReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
