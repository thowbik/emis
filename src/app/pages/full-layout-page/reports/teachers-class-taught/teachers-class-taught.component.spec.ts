import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersClassTaughtComponent } from './teachers-class-taught.component';

describe('TeachersClassTaughtComponent', () => {
  let component: TeachersClassTaughtComponent;
  let fixture: ComponentFixture<TeachersClassTaughtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersClassTaughtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersClassTaughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
