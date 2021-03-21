import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeCutsweaterRegComponent } from './costfree-cutsweater-reg.component';

describe('CostfreeCutsweaterRegComponent', () => {
  let component: CostfreeCutsweaterRegComponent;
  let fixture: ComponentFixture<CostfreeCutsweaterRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeCutsweaterRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeCutsweaterRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
