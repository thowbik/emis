import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooldetailsEditComponent } from './schooldetails-edit.component';

describe('SchooldetailsEditComponent', () => {
  let component: SchooldetailsEditComponent;
  let fixture: ComponentFixture<SchooldetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchooldetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooldetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
