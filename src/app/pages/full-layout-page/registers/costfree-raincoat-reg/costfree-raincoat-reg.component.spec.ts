import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeRaincoatRegComponent } from './costfree-raincoat-reg.component';

describe('CostfreeRaincoatRegComponent', () => {
  let component: CostfreeRaincoatRegComponent;
  let fixture: ComponentFixture<CostfreeRaincoatRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeRaincoatRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeRaincoatRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
