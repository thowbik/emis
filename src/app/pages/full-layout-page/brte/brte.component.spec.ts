import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrteComponent } from './brte.component';

describe('BrteComponent', () => {
  let component: BrteComponent;
  let fixture: ComponentFixture<BrteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
