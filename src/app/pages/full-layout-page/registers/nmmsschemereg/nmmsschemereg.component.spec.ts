import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmmsschemeregComponent } from './nmmsschemereg.component';

describe('NmmsschemeregComponent', () => {
  let component: NmmsschemeregComponent;
  let fixture: ComponentFixture<NmmsschemeregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmmsschemeregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmmsschemeregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
