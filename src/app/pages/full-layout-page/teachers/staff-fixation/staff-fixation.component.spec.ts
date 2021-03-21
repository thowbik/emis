import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffFixationComponent } from './staff-fixation.component';

describe('StaffFixationComponent', () => {
  let component: StaffFixationComponent;
  let fixture: ComponentFixture<StaffFixationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffFixationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffFixationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
