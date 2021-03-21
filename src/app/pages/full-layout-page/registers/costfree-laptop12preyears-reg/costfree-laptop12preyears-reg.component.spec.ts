import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeLaptop12preyearsRegComponent } from './costfree-laptop12preyears-reg.component';

describe('CostfreeLaptop12preyearsRegComponent', () => {
  let component: CostfreeLaptop12preyearsRegComponent;
  let fixture: ComponentFixture<CostfreeLaptop12preyearsRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeLaptop12preyearsRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeLaptop12preyearsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
