import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlasstudentdistrictwiseComponent } from './slasstudentdistrictwise.component';

describe('SlasstudentdistrictwiseComponent', () => {
  let component: SlasstudentdistrictwiseComponent;
  let fixture: ComponentFixture<SlasstudentdistrictwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlasstudentdistrictwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlasstudentdistrictwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
