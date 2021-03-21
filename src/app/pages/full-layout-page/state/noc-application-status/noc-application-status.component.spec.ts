import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationStatusComponent } from './noc-application-status.component';

describe('NocApplicationStatusComponent', () => {
  let component: NocApplicationStatusComponent;
  let fixture: ComponentFixture<NocApplicationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocApplicationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
