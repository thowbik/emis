import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaInspectionComponent } from './pla-inspection.component';

describe('PlaInspectionComponent', () => {
  let component: PlaInspectionComponent;
  let fixture: ComponentFixture<PlaInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
