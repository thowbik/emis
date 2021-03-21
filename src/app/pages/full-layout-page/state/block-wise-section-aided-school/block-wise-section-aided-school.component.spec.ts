import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockWiseSectionAidedSchoolComponent } from './block-wise-section-aided-school.component';

describe('BlockWiseSectionAidedSchoolComponent', () => {
  let component: BlockWiseSectionAidedSchoolComponent;
  let fixture: ComponentFixture<BlockWiseSectionAidedSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockWiseSectionAidedSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockWiseSectionAidedSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
