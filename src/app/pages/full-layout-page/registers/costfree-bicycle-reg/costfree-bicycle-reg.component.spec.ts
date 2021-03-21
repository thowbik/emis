import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeBicycleRegComponent } from './costfree-bicycle-reg.component';

describe('CostfreeBicycleRegComponent', () => {
  let component: CostfreeBicycleRegComponent;
  let fixture: ComponentFixture<CostfreeBicycleRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeBicycleRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeBicycleRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
