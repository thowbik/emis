import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7SlasReportComponent } from './class7-slas-report.component';

describe('Class7SlasReportComponent', () => {
  let component: Class7SlasReportComponent;
  let fixture: ComponentFixture<Class7SlasReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Class7SlasReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Class7SlasReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
