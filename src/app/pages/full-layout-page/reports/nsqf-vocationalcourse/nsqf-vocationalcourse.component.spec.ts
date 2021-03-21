import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsqfVocationalcourseComponent } from './nsqf-vocationalcourse.component';

describe('NsqfVocationalcourseComponent', () => {
  let component: NsqfVocationalcourseComponent;
  let fixture: ComponentFixture<NsqfVocationalcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsqfVocationalcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsqfVocationalcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
