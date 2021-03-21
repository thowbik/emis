import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDeoRenewalRecognitionComponent } from './state-deo-renewal-recognition.component';

describe('StateDeoRenewalRecognitionComponent', () => {
  let component: StateDeoRenewalRecognitionComponent;
  let fixture: ComponentFixture<StateDeoRenewalRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateDeoRenewalRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDeoRenewalRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
