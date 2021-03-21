import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGrantsComponent } from './school-grants.component';

describe('SchoolGrantsComponent', () => {
  let component: SchoolGrantsComponent;
  let fixture: ComponentFixture<SchoolGrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
