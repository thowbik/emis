import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlasstudentschoolwiseComponent } from './slasstudentschoolwise.component';

describe('SlasstudentschoolwiseComponent', () => {
  let component: SlasstudentschoolwiseComponent;
  let fixture: ComponentFixture<SlasstudentschoolwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlasstudentschoolwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlasstudentschoolwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
