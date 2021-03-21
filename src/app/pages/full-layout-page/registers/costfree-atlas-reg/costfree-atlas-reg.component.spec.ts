import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeAtlasRegComponent } from './costfree-atlas-reg.component';

describe('CostfreeAtlasRegComponent', () => {
  let component: CostfreeAtlasRegComponent;
  let fixture: ComponentFixture<CostfreeAtlasRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeAtlasRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeAtlasRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
