import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCeoRenewalRecognitionComponent } from './state-ceo-renewal-recognition.component';

describe('StateCeoRenewalRecognitionComponent', () => {
  let component: StateCeoRenewalRecognitionComponent;
  let fixture: ComponentFixture<StateCeoRenewalRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateCeoRenewalRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCeoRenewalRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
