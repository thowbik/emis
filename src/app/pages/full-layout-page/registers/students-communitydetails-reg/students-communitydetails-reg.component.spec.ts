import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCommunitydetailsRegComponent } from './students-communitydetails-reg.component';

describe('StudentsCommunitydetailsRegComponent', () => {
  let component: StudentsCommunitydetailsRegComponent;
  let fixture: ComponentFixture<StudentsCommunitydetailsRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsCommunitydetailsRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsCommunitydetailsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
