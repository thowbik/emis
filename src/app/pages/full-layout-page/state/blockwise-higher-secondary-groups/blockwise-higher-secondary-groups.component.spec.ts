import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BLockwiseHigherSecondaryGroupsComponent } from './blockwise-higher-secondary-groups.component';

describe('BLockwiseHigherSecondaryGroupsComponent', () => {
  let component: BLockwiseHigherSecondaryGroupsComponent;
  let fixture: ComponentFixture<BLockwiseHigherSecondaryGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BLockwiseHigherSecondaryGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BLockwiseHigherSecondaryGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
