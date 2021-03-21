import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRejectedRenewalRecognitionComponent } from './state-rejected-renewal-recognition.component';

describe('StateRejectedRenewalRecognitionComponent', () => {
  let component: StateRejectedRenewalRecognitionComponent;
  let fixture: ComponentFixture<StateRejectedRenewalRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateRejectedRenewalRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateRejectedRenewalRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
