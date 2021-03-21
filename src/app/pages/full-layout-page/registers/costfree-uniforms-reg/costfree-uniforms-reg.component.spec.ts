import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeUniformsRegComponent } from './costfree-uniforms-reg.component';

describe('CostfreeUniformsRegComponent', () => {
  let component: CostfreeUniformsRegComponent;
  let fixture: ComponentFixture<CostfreeUniformsRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeUniformsRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeUniformsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
