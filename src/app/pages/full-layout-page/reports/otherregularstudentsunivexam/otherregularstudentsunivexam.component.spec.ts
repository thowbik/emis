import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherregularstudentsunivexamComponent } from './otherregularstudentsunivexam.component';

describe('OtherregularstudentsunivexamComponent', () => {
  let component: OtherregularstudentsunivexamComponent;
  let fixture: ComponentFixture<OtherregularstudentsunivexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherregularstudentsunivexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherregularstudentsunivexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
