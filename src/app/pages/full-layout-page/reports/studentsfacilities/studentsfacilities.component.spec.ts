import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsfacilitiesComponent } from './studentsfacilities.component';

describe('StudentsfacilitiesComponent', () => {
  let component: StudentsfacilitiesComponent;
  let fixture: ComponentFixture<StudentsfacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsfacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsfacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
