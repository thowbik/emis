import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteApplicantsComponent } from './rte-applicants.component';

describe('RteApplicantsComponent', () => {
  let component: RteApplicantsComponent;
  let fixture: ComponentFixture<RteApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
