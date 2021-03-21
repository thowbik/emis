import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteIntakeCapacityComponent } from './rte-intake-capacity.component';

describe('RteIntakeCapacityComponent', () => {
  let component: RteIntakeCapacityComponent;
  let fixture: ComponentFixture<RteIntakeCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteIntakeCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteIntakeCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
