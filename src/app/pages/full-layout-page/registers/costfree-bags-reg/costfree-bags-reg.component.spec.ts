import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeBagsRegComponent } from './costfree-bags-reg.component';

describe('CostfreeBagsRegComponent', () => {
  let component: CostfreeBagsRegComponent;
  let fixture: ComponentFixture<CostfreeBagsRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeBagsRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeBagsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
