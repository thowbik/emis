import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherSecondaryGroupsComponent } from './higher-secondary-groups.component';

describe('HigherSecondaryGroupsComponent', () => {
  let component: HigherSecondaryGroupsComponent;
  let fixture: ComponentFixture<HigherSecondaryGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HigherSecondaryGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HigherSecondaryGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
