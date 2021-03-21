import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTrainingdetailsComponent } from './staff-trainingdetails.component';

describe('StaffTrainingdetailsComponent', () => {
  let component: StaffTrainingdetailsComponent;
  let fixture: ComponentFixture<StaffTrainingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTrainingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTrainingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
