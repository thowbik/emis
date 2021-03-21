import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRaiseRequestComponent } from './students-raise-request.component';

describe('StudentsRaiseRequestComponent', () => {
  let component: StudentsRaiseRequestComponent;
  let fixture: ComponentFixture<StudentsRaiseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsRaiseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsRaiseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
