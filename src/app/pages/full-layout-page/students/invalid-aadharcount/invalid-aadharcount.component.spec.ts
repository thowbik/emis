import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidAadharcountComponent } from './invalid-aadharcount.component';

describe('InvalidAadharcountComponent', () => {
  let component: InvalidAadharcountComponent;
  let fixture: ComponentFixture<InvalidAadharcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidAadharcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidAadharcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
