import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeSummaryComponent } from './scheme-summary.component';

describe('SchemeSummaryComponent', () => {
  let component: SchemeSummaryComponent;
  let fixture: ComponentFixture<SchemeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
