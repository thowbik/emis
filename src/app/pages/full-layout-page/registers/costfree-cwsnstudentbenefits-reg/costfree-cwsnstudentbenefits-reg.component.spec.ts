import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeCWSNstudentbenefitsRegComponent } from './costfree-cwsnstudentbenefits-reg.component';

describe('CostfreeCWSNstudentbenefitsRegComponent', () => {
  let component: CostfreeCWSNstudentbenefitsRegComponent;
  let fixture: ComponentFixture<CostfreeCWSNstudentbenefitsRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeCWSNstudentbenefitsRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeCWSNstudentbenefitsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
