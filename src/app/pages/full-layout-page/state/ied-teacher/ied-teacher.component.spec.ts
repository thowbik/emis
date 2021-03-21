import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IedTeacherComponent } from './ied-teacher.component';

describe('IedTeacherComponent', () => {
  let component: IedTeacherComponent;
  let fixture: ComponentFixture<IedTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IedTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IedTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
