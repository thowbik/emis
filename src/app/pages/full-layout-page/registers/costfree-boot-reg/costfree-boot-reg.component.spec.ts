import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeBootRegComponent } from './costfree-boot-reg.component';

describe('CostfreeBootRegComponent', () => {
  let component: CostfreeBootRegComponent;
  let fixture: ComponentFixture<CostfreeBootRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeBootRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeBootRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
