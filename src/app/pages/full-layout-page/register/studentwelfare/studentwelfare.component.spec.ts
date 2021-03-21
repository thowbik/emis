import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentwelfareComponent } from './studentwelfare.component';

describe('StudentwelfareComponent', () => {
  let component: StudentwelfareComponent;
  let fixture: ComponentFixture<StudentwelfareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentwelfareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentwelfareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
