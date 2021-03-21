import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrantStudentListComponent } from './migrant-student-list.component';

describe('MigrantStudentListComponent', () => {
  let component: MigrantStudentListComponent;
  let fixture: ComponentFixture<MigrantStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrantStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrantStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
