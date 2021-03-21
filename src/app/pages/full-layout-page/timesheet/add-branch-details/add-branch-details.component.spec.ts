import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchDetailsComponent } from './add-branch-details.component';

describe('AddBranchDetailsComponent', () => {
  let component: AddBranchDetailsComponent;
  let fixture: ComponentFixture<AddBranchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBranchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
