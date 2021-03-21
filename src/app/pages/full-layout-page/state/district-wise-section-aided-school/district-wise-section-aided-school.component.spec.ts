import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictWiseSectionAidedSchoolComponent } from './district-wise-section-aided-school.component';

describe('DistrictWiseSectionAidedSchoolComponent', () => {
  let component: DistrictWiseSectionAidedSchoolComponent;
  let fixture: ComponentFixture<DistrictWiseSectionAidedSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictWiseSectionAidedSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictWiseSectionAidedSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
