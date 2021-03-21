import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleregisterComponent } from './scaleregister.component';

describe('ScaleregisterComponent', () => {
  let component: ScaleregisterComponent;
  let fixture: ComponentFixture<ScaleregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
