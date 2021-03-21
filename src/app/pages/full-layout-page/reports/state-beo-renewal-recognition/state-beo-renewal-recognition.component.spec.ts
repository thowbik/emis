import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBeoRenewalRecognitionComponent } from './state-beo-renewal-recognition.component';

describe('StateBeoRenewalRecognitionComponent', () => {
  let component: StateBeoRenewalRecognitionComponent;
  let fixture: ComponentFixture<StateBeoRenewalRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateBeoRenewalRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBeoRenewalRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
