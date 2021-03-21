import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCountVillagewiseComponent } from './student-count-villagewise.component';

describe('StudentCountVillagewiseComponent', () => {
  let component: StudentCountVillagewiseComponent;
  let fixture: ComponentFixture<StudentCountVillagewiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCountVillagewiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCountVillagewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
