import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeGeometryboxRegComponent } from './costfree-geometrybox-reg.component';

describe('CostfreeGeometryboxRegComponent', () => {
  let component: CostfreeGeometryboxRegComponent;
  let fixture: ComponentFixture<CostfreeGeometryboxRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeGeometryboxRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeGeometryboxRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
