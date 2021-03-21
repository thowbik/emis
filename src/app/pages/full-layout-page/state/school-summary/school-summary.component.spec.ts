import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSummaryComponent } from './school-summary.component';

describe('SchoolSummaryComponent', () => {
  let component: SchoolSummaryComponent;
  let fixture: ComponentFixture<SchoolSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
