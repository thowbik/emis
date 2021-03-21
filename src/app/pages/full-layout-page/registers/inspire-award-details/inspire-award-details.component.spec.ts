import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspireAwardDetailsComponent } from './inspire-award-details.component';

describe('InspireAwardDetailsComponent', () => {
  let component: InspireAwardDetailsComponent;
  let fixture: ComponentFixture<InspireAwardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspireAwardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspireAwardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
