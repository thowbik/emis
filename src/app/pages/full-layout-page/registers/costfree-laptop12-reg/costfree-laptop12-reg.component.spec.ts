import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeLaptop12RegComponent } from './costfree-laptop12-reg.component';

describe('CostfreeLaptop12RegComponent', () => {
  let component: CostfreeLaptop12RegComponent;
  let fixture: ComponentFixture<CostfreeLaptop12RegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeLaptop12RegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeLaptop12RegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
