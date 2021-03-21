import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleIssueComponent } from './bicycle-issue.component';

describe('BicycleIssueComponent', () => {
  let component: BicycleIssueComponent;
  let fixture: ComponentFixture<BicycleIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicycleIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicycleIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
