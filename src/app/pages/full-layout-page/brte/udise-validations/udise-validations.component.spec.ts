import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdiseValidationsComponent } from './udise-validations.component';

describe('UdiseValidationsComponent', () => {
  let component: UdiseValidationsComponent;
  let fixture: ComponentFixture<UdiseValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdiseValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdiseValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
