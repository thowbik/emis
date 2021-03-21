import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalStaffNsqfRegComponent } from './vocational-staff-nsqf-reg.component';

describe('VocationalStaffNsqfRegComponent', () => {
  let component: VocationalStaffNsqfRegComponent;
  let fixture: ComponentFixture<VocationalStaffNsqfRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalStaffNsqfRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalStaffNsqfRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
