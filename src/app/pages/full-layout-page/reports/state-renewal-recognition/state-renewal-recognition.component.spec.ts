import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRenewalRecognitionComponent } from './state-renewal-recognition.component';

describe('StateRenewalRecognitionComponent', () => {
  let component: StateRenewalRecognitionComponent;
  let fixture: ComponentFixture<StateRenewalRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateRenewalRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateRenewalRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
