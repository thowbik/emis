import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeoComponent } from './beo.component';

describe('BeoComponent', () => {
  let component: BeoComponent;
  let fixture: ComponentFixture<BeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
