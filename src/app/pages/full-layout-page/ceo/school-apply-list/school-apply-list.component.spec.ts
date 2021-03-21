import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolApplyListComponent } from './school-apply-list.component';

describe('SchoolApplyListComponent', () => {
  let component: SchoolApplyListComponent;
  let fixture: ComponentFixture<SchoolApplyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolApplyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolApplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
