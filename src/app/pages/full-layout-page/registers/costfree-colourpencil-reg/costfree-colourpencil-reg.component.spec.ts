import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeColourpencilRegComponent } from './costfree-colourpencil-reg.component';

describe('CostfreeColourpencilRegComponent', () => {
  let component: CostfreeColourpencilRegComponent;
  let fixture: ComponentFixture<CostfreeColourpencilRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeColourpencilRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeColourpencilRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
