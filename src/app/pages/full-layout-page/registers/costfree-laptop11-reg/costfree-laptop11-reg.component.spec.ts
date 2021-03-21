import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeLaptop11RegComponent } from './costfree-laptop11-reg.component';

describe('CostfreeLaptop11RegComponent', () => {
  let component: CostfreeLaptop11RegComponent;
  let fixture: ComponentFixture<CostfreeLaptop11RegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeLaptop11RegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeLaptop11RegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
