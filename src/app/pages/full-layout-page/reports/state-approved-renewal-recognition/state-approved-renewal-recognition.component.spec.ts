import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateApprovedRenewalRecognitionComponent } from './state-approved-renewal-recognition.component';

describe('StateApprovedRenewalRecognitionComponent', () => {
  let component: StateApprovedRenewalRecognitionComponent;
  let fixture: ComponentFixture<StateApprovedRenewalRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateApprovedRenewalRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateApprovedRenewalRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
