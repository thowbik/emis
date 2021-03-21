import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCashIncentiveComponent } from './special-cash-incentive.component';

describe('SpecialCashIncentiveComponent', () => {
  let component: SpecialCashIncentiveComponent;
  let fixture: ComponentFixture<SpecialCashIncentiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialCashIncentiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialCashIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
