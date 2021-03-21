import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetationReportsComponent } from './competation-reports.component';

describe('CompetationReportsComponent', () => {
  let component: CompetationReportsComponent;
  let fixture: ComponentFixture<CompetationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
