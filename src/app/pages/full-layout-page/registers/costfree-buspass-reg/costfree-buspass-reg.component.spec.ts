import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeBuspassRegComponent } from './costfree-buspass-reg.component';

describe('CostfreeBuspassRegComponent', () => {
  let component: CostfreeBuspassRegComponent;
  let fixture: ComponentFixture<CostfreeBuspassRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeBuspassRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeBuspassRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
