import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenttaggingComponent } from './studenttagging.component';

describe('StudenttaggingComponent', () => {
  let component: StudenttaggingComponent;
  let fixture: ComponentFixture<StudenttaggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenttaggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenttaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
