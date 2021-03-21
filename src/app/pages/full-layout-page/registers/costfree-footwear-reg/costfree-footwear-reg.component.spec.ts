import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeFootwearRegComponent } from './costfree-footwear-reg.component';

describe('CostfreeFootwearRegComponent', () => {
  let component: CostfreeFootwearRegComponent;
  let fixture: ComponentFixture<CostfreeFootwearRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeFootwearRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeFootwearRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
