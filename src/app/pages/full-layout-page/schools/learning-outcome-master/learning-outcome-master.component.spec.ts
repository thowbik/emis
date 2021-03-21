import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningOutcomeMasterComponent } from './learning-outcome-master.component';

describe('LearningOutcomeMasterComponent', () => {
  let component: LearningOutcomeMasterComponent;
  let fixture: ComponentFixture<LearningOutcomeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningOutcomeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningOutcomeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
