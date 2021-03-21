import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeTextbooksRegComponent } from './costfree-textbooks-reg.component';

describe('CostfreeTextbooksRegComponent', () => {
  let component: CostfreeTextbooksRegComponent;
  let fixture: ComponentFixture<CostfreeTextbooksRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeTextbooksRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeTextbooksRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
