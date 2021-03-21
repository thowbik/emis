import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolWiseSectionAidedSchoolComponent } from './school-wise-section-aided-school.component';

describe('SchoolWiseSectionAidedSchoolComponent', () => {
  let component: SchoolWiseSectionAidedSchoolComponent;
  let fixture: ComponentFixture<SchoolWiseSectionAidedSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolWiseSectionAidedSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolWiseSectionAidedSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
