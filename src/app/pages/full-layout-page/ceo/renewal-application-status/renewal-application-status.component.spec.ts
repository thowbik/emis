import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalApplicationStatusComponent } from './renewal-application-status.component';

describe('RenewalApplicationStatusComponent', () => {
  let component: RenewalApplicationStatusComponent;
  let fixture: ComponentFixture<RenewalApplicationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalApplicationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
